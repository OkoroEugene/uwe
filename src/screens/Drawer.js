import React, { Component, Fragment } from 'react';
import { StyleSheet, View, Modal, ActivityIndicator, NativeModules, TouchableOpacity } from 'react-native';
import {
    Button,
    Icon
} from 'native-base';
import Loader from './Loader';
import { Thumbnail } from 'native-base';
import Text from '../AppText';
import Axios from 'axios';
import config from '../config';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { Navigation } from 'react-native-navigation';
import Placeholder, { Line, Media } from "rn-placeholder";
import { goToAuth } from '../Navigation';
const KinNative = NativeModules.KinNativeModule;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 55,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});

const kinConfig = {
    appId: "test",
    environment: "DEVELOPMENT"
    // appId: "vNiX",
    // environment: "PRODUCTION"
};
export default class Drawer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            loadingText: undefined,
            balance: undefined,
            userCredentials: {}
        };
    }

    componentDidMount() {
        this.fetchUserData();
        // if (this.state.userCredentials) {
        //     setInterval(() => {
        //         this.getKinAccountBalance(this.state.userCredentials.accountNumber);
        //     }, 1000);   
        // }
        // this.defaultPubAddress();
    }

    transferKin = (accountNumber, publicAddress) => {
        // buildTransaction(String config, int accountNumber, String recipientAddress, BigDecimal amount, int fee, final Callback cb) {
        if (accountNumber && publicAddress) {
            KinNative.buildTransaction(JSON.stringify(kinConfig), parseInt(0), publicAddress, parseFloat(30), (error, result) => {
                console.log(error);
                console.log(result);
            });
        }
    }

    defaultPubAddress() {
        KinNative.getPublicAddress(JSON.stringify(kinConfig), 0, (error, result) => {
            console.log(error)
            console.log(result)
            console.log("-----pub address---")
        })
    }

    fetchUserData() {
        AsyncStorage.getItem("TOKEN")
            .then(token => {
                if (!token) { }
                Axios.get(`${config.env.prod.url}/user`, {
                    headers: { Authorization: `Bearer ${token}` || undefined }
                }).then((response) => {
                    console.log(response.data)
                    this.getKinAccountBalance(response.data.accountNumber);
                    // this.transferKin(response.data.accountNumber, response.data.publicAddress);
                    this.setState({ userCredentials: response.data });
                })
            });
    }

    logout() {
        AsyncStorage.clear(function (err) {
            if (err) {
                console.log(err);
            }
        })
        // Navigation.setRoot({
        //     root: {
        //         component: {
        //             name: "uwe.Login"
        //         }
        //     }
        // });
        goToAuth();
    }

    showLoader(loadingText) {
        this.setState({ loading: true, loadingText })
    }

    hideLoader() {
        this.setState({ loading: false, loadingText: null })
    }

    getKinAccountBalance = accountNumber => {
        if (accountNumber) {
            KinNative.getUserBalance(JSON.stringify(kinConfig), parseInt(accountNumber), (error, balance) => {
                console.log(error);
                console.log(balance);
                this.setState({ balance });
            });
        }
    }

    render() {
        const { loading, loadingText, balance } = this.state;

        return (
            <Fragment>
                <View style={styles.container}>
                    <LinearGradient
                        start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                        locations={[0, 0.5, 0.6]}
                        colors={['#B43D3B', '#ED483A', '#B43D3B']}
                        style={[{
                            height: 300,
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center"
                        }, this.state.isProcessing ? { opacity: 0.5 } : { opacity: 1 }]}>
                        <View style={!this.state.balance ? { marginTop: 50, padding: 10 } : null}>
                            <Placeholder
                                isReady={this.state.userCredentials && this.state.userCredentials.publicAddress ? true : false}
                                animation="fade"
                                whenReadyRender={() => <View style={{ alignItems: "center" }}>
                                    <View>
                                        <Thumbnail style={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: 80 / 2,
                                            borderWidth: 2,
                                            borderColor: "white"
                                        }} source={require('../imgs/avatar-profile-picture-3.png')} />
                                    </View>
                                    <Text style={{ fontSize: 25, color: "white" }}>Welcome {this.state.userCredentials.username}</Text>
                                    <View style={{ alignItems: "center" }}>
                                        <Text style={{ fontSize: 18, color: "#bbb" }}>KIN Public Wallet</Text>
                                        <View style={{ padding: 20 }}>
                                            <Text style={{ fontFamily: "Kastelov - Axiforma Heavy", color: "white", textAlign: "center" }}>{this.state.userCredentials.publicAddress}</Text>
                                        </View>
                                        {/* <Text style={{ fontSize: 18, color: "#bbb" }}>Balance</Text>
                                        <Text style={{ fontFamily: "Kastelov - Axiforma Heavy", color: "white" }}>{balance}</Text> */}
                                    </View>
                                </View>}
                            >
                                <Line width="70%" />
                                <Line />
                                <Line />
                                <Line width="30%" />
                            </Placeholder>
                        </View>
                    </LinearGradient>
                    <View>
                        <View style={{ marginTop: 40, marginLeft: 6 }}>
                            <TouchableOpacity style={{ flexDirection: "row", padding: 10 }}>
                                <Icon type="Ionicons" name="ios-home" />
                                <Text style={{ marginTop: 4, paddingHorizontal: 10 }}>Home</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Navigation.push(this.props.componentId, {
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
                            })} style={{ flexDirection: "row", padding: 10 }}>
                                <Icon type="Ionicons" name="ios-cash" />
                                <Text style={{ marginTop: 4, paddingHorizontal: 10 }}>KIN Market Place</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.logout()} style={{ flexDirection: "row", padding: 10 }}>
                                <Icon type="Ionicons" name="ios-log-out" />
                                <Text style={{ marginTop: 4, paddingHorizontal: 10 }}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {loading && <Loader loading={loading} text={loadingText} />}
                <View style={{ position: "absolute", bottom: 10, alignSelf: "center" }}>
                    <Text style={{ color: "#bbb" }}>Powered by UWE</Text>
                </View>
            </Fragment>
        );
    }
}