import React from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
    TouchableHighlight,
    NativeModules,
    Dimensions
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
import LinearGradient from 'react-native-linear-gradient';
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
            userCredentials: {},
            changeCount: 0
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
            <View style={{ alignItems: "center" }}>
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
                    {/* <TouchableOpacity
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
                    </TouchableOpacity> */}
                </View>
            </View>
        );
    }
    updateData(data, i) {
        this.transferKin(2);
        this.setState({ [this.state.meta]: data, selected: i, changeCount: this.state.changeCount + 1 })
    }
    fabrics(data) {
        return (
            <View>
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
                                    width: 60,
                                    height: 60,
                                    borderRadius: 60 / 2,
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
                <View style={{ justifyContent: "center", position: "relative", bottom: "10%", paddingHorizontal: 58, marginTop: 30 }}>
                    <TouchableOpacity
                        onPress={() => this.goBack()}
                    >
                        <LinearGradient
                            start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                            locations={[0, 0.5, 0.6]}
                            colors={['#B43D3B', '#ED483A', '#B43D3B']}
                            style={[{
                                height: 50,
                                width: "100%",
                                alignItems: "center",
                                borderRadius: 50,
                                justifyContent: "center"
                            }]}>
                            <View style={{ flexDirection: "row" }}>
                                <Icon fontSize={30} type="Ionicons" name="arrow-back" style={{ color: "white", marginRight: 10 }} />
                                <Text style={{ color: "white", marginTop: 3 }}>Go Back</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    showLoader(loadingText) {
        this.setState({ loading: true, loadingText })
    }

    hideLoader() {
        this.setState({ loading: false, loadingText: null })
    }

    transferKin = async (amt = 0) => {
        this.setState({ isProcessing: true });
        let data = {
            destination: this.state.userCredentials.publicAddress,
            amount: amt == 0 ? 50 : amt
        }
        await Axios.post(`${config.env.prod.url}/kin/send`, data).then((response) => {
            if (response.data && amt == 0) {
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
            }
        }).catch((err) => {
            if (err) {
                this.setState({ isProcessing: false });
                alert("network error!")
            }
        })
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
                    alert('Congratulations!! You have earned 50KIN coin.');
                    this.transferKin();
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
                    .catch(err => {
                        alert(err)
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
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
                {/* <Image style={{ width: "50%", height: "50%", marginTop: 1000 }} source={{ uri: this.state.screenShot }} /> */}
                <View style={{ alignItems: "center", marginTop: 10 }}>
                    <View style={{ width: 100, height: 24, borderRadius: 30, backgroundColor: "#ccc", justifyContent: "center" }}>
                        <Text style={{ fontSize: 14, color: "black", textAlign: "center" }}>Counter: {this.state.changeCount}</Text>
                    </View>
                </View>
                <ViewShot
                    style={{
                        flexGrow: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        // backgroundColor: "red",
                        height: Dimensions.get('window').height - 450,
                        paddingTop: "80%",
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
                <View style={{ flex: 1 }}>
                    {
                        this.state.fabrics.length > 0 ? this.fabrics(this.state.fabrics) : this.options()
                    }
                    {/* {
                        this.state.fabrics.length > 0 ? <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity
                                onPress={() => this.goBack()}
                            >
                                <Icon fontSize={30} type="Ionicons" name="arrow-back" />
                            </TouchableOpacity>
                        </View> : null
                    } */}
                </View>
                <View style={{ position: "absolute", bottom: 50, alignSelf: "center" }}>
                    <Button style={{ width: "100%", height: 50, justifyContent: "center", borderRadius: 50 }} large icon onPress={this.screenShot.bind(this)}>
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