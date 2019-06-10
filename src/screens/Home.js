import React from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
    TouchableHighlight,
    NativeModules
} from 'react-native';
import {
    Thumbnail,
    Icon,
    Button
} from 'native-base';
import Text from '../AppText';
import Collar from './Collar';
import Sleeves from './Sleeves';
import Body from './Body';
import Cuffs from './Cuffs';
import faker from '../Faker';
import ViewShot from "react-native-view-shot";
import { LoginButton, AccessToken, ShareDialog, ShareApi } from 'react-native-fbsdk';
import Loader from './Loader';
import { iconsMap, iconsLoaded } from '../helpers/IconsLoader';
import { Navigation } from 'react-native-navigation';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../config';
const KinNative = NativeModules.KinNativeModule;

const kinConfig = {
    appId: "test",
    environment: "DEVELOPMENT"
    // appId: "vNiX",
    // environment: "PRODUCTION"
};
class Home extends React.Component {
    constructor(props) {
        super(props);
        const shareLinkContent = {
            contentType: 'photo',
            photos: [
                {
                    imageUrl: './local/image/path.png',
                    userGenerated: false,
                    caption: 'Hello World'
                }
            ]
        };
        this.state = {
            collar: require('../imgs/dottedCollar.png'),
            sleeves: require('../imgs/dottedSleeve.png'),
            body: require('../imgs/dottedShirt.png'),
            cuffs: require('../imgs/drhh.png'),
            fabrics: [],
            meta: "",
            selected: undefined,
            screenShot: undefined,
            shareLinkContent,
            loading: false,
            loadingText: undefined,
            isDrawerVisible: false,
            userCredentials: {}
        }
    }
    componentDidMount() {
        this.navigationEventListener = Navigation.events().bindComponent(this);
        this.fetchUserData();
    }

    componentWillUnmount() {
        // Not mandatory
        if (this.navigationEventListener) {
            this.navigationEventListener.remove();
        }
    }

    navigationButtonPressed({ buttonId }) {
        if (buttonId == "drawer") {
            Navigation.mergeOptions('Drawer', {
                sideMenu: {
                    left: {
                        visible: !this.state.isDrawerVisible
                    }
                }
            });
            this.setState({ isDrawerVisible: !this.state.isDrawerVisible })
        }
        if (buttonId == "logout") {
            alert("logout")
        }
    }
    handleSort(value) {
        this.setState({ fabrics: faker[value], meta: value })
    }
    // onCapture = uri => {
    //     console.log("do something with ", uri);
    // }
    goBack() {
        this.setState({ fabrics: [] })
    }
    options() {
        return (
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                    onPress={() => this.handleSort("collar")}
                    style={{
                        padding: 10,
                        margin: 10,
                        backgroundColor: "#CCC",
                        width: 60,
                        height: 60,
                        borderRadius: 60 / 2,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text style={{ fontSize: 10 }}>Collars</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.handleSort("body")}
                    style={{
                        padding: 10,
                        margin: 10,
                        backgroundColor: "#CCC",
                        width: 60,
                        height: 60,
                        borderRadius: 60 / 2,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text style={{ fontSize: 10 }}>Body</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.handleSort("sleeves")}
                    style={{
                        padding: 10,
                        margin: 10,
                        backgroundColor: "#CCC",
                        width: 60,
                        height: 60,
                        borderRadius: 60 / 2,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text style={{ fontSize: 10 }}>Sleeves</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.handleSort("cuffs")}
                    style={{
                        padding: 10,
                        margin: 10,
                        backgroundColor: "#CCC",
                        width: 60,
                        height: 60,
                        borderRadius: 60 / 2,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text style={{ fontSize: 10 }}>Cuffs</Text>
                </TouchableOpacity>
            </View>
        );
    }
    updateData(data, i) {
        this.setState({ [this.state.meta]: data, selected: i })
    }
    fabrics(data) {
        return (
            <ScrollView contentContainerStyle={{ paddingVertical: 20 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                {
                    data.map((items, i) =>
                        <TouchableOpacity
                            key={i}
                            style={this.state.selected === i ? {
                                backgroundColor: "#CCC",
                                width: 80,
                                height: 80,
                                borderRadius: 80 / 2,
                                justifyContent: "center", alignItems: "center"
                            } : null}
                            onPress={() => this.updateData(items, i)}
                        >
                            <Thumbnail style={{
                                width: 40,
                                height: 40,
                                borderRadius: 40 / 2,
                                margin: 10,
                                aspectRatio: 2 / 1
                            }} source={items} />
                        </TouchableOpacity>)
                }
            </ScrollView>
        );
    }

    showLoader(loadingText) {
        this.setState({ loading: true, loadingText })
    }

    hideLoader() {
        this.setState({ loading: false, loadingText: null })
    }

    transferKin = (accountNumber, publicAddress) => {
        if (publicAddress) {
            KinNative.buildTransaction(JSON.stringify(kinConfig), parseInt(0), publicAddress, parseFloat(100), (error, result) => {
                console.log(error);
                console.log(result);
                this.hideLoader();
                Navigation.push(this.props.componentId, {
                    component: {
                        name: 'uwe.KinMarketPlace',
                        options: {
                            topBar: {
                                title: {
                                    text: 'Kin Market Place'
                                }
                            }
                        },
                        passProps: {
                            credentials: this.state.userCredentials
                        }
                    }
                })
            });
        }
    }
    screenShot() {
        this.showLoader("Please wait...");
        this.refs.viewShot.capture().then(uri => {
            this.setState({ screenShot: uri })
            setTimeout(() => {
                this.hideLoader();
                this.shareLinkWithShareDialog();
            }, 1000);
        });
    }
    async shareLinkWithShareDialog() {
        const shareLinkContent = {
            contentType: 'photo',
            photos: [
                {
                    imageUrl: this.state.screenShot,
                    userGenerated: false,
                    caption: "Uwe.ng fabric test"
                }
            ]
        };
        const canShow = await ShareDialog.canShow(shareLinkContent);
        if (canShow) {
            try {
                const { isCancelled, postId } = await ShareDialog.show(
                    shareLinkContent,
                );
                if (isCancelled) {
                    alert('Share cancelled');
                } else {
                    alert('Share success with postId: ' + postId + '. You have earned 100KIN coin.');
                    this.transferKin(this.state.userCredentials.accountNumber, this.state.userCredentials.publicAddress);
                    this.showLoader("Initializing transaction...")
                }
            } catch (error) {
                alert('Share fail with error: ' + error);
            }
        } else {
            alert("Please install an up-to-date version of facebook")
        }
    }
    fetchUserData() {
        AsyncStorage.getItem("TOKEN")
            .then(token => {
                if (!token) { }
                Axios.get(`${config.env.prod.url}/user`, {
                    headers: { Authorization: `Bearer ${token}` || undefined }
                }).then((response) => {
                    console.log(response.data)
                    this.setState({ userCredentials: response.data });
                })
            });
    }
    facebookLogin() {
        LoginManager.logInWithReadPermissions(["public_profile"]).then(
            function (result) {
                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    console.log(
                        "Login success with permissions: " +
                        result.grantedPermissions.toString()
                    );
                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        );
    }
    render() {
        const { loading, loadingText } = this.state;
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
                {/* <Image style={{ width: "50%", height: "50%", marginTop: 1000 }} source={{ uri: this.state.screenShot }} /> */}
                <ViewShot
                    style={{
                        flexGrow: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        // bottom: 80,
                        // borderWidth: 2,
                        // borderColor: "#bbb",
                        paddingHorizontal: 60
                    }} ref="viewShot" options={{ format: "jpg", quality: 0.9 }}>
                    {/* <ViewShot style={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }} onCapture={this.onCapture} captureMode="mount"> */}
                    <View style={{ marginTop: -100 }}>
                        <Collar collar={this.state.collar} />
                        <Sleeves sleeves={this.state.sleeves} />
                        <Body body={this.state.body} />
                    </View>
                    {/* <Cuffs cuffs={this.state.cuffs} /> */}
                </ViewShot>
                <View style={{ position: "absolute", bottom: 130 }}>
                    {
                        this.state.fabrics.length > 0 ? this.fabrics(this.state.fabrics) : this.options()
                    }
                    {
                        this.state.fabrics.length > 0 ? <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity
                                onPress={() => this.goBack()}
                            >
                                <Icon fontSize={30} type="Ionicons" name="arrow-back" />
                            </TouchableOpacity>
                        </View> : null
                    }
                </View>
                <View style={{ position: "absolute", bottom: 50 }}>
                    <Button style={{ width: "100%", height: 50, justifyContent: "center" }} large icon onPress={this.screenShot.bind(this)}>
                        <Icon name='logo-facebook' />
                        <Text style={{ color: "white" }}>Share to earn Kin coins</Text>
                    </Button>
                </View>
                {loading && <Loader loading={loading} text={loadingText} />}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    shareText: {
        fontSize: 20,
        margin: 10,
    },
});

export default Home;