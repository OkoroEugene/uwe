import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, NativeModules, Clipboard } from "react-native";
import { Form, Item, Input, Label, Toast, Icon, Thumbnail, Spinner, Card, CardItem, Content } from 'native-base';
import styles from '../styles';
import Text from '../AppText';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import { goHome } from '../Navigation';
import Loader from './Loader';
import config from '../config';
import Axios from 'axios';
import Placeholder, { Line, Media } from "rn-placeholder";

const KinNative = NativeModules.KinNativeModule;
const kinConfig = {
    appId: "test",
    environment: "DEVELOPMENT"
    // appId: "vNiX",
    // environment: "PRODUCTION"
};
class KinMarketPlace extends Component {
    state = {
        userCredentials: {},
        balance: undefined,
        loading: false,
        loadingText: undefined,
        isProcessing: false
    };

    showLoader(loadingText) {
        this.setState({ loading: true, loadingText })
    }

    hideLoader() {
        this.setState({ loading: false, loadingText: null })
    }

    componentDidMount() {
        if (this.props.credentials) {
            this.setState({ userCredentials: this.props.credentials });
            this.getKinAccountBalance(this.props.credentials.accountNumber);
        }
    }

    copyToClipboard() {
        Clipboard.setString(this.props.credentials.publicAddress);
        KinNative.showToast("Copied to clipboard");
    }

    transferKin = (accountNumber, amount) => {
        // this.showLoader("Please wait...");
        this.setState({ isProcessing: true });
        if (accountNumber && amount) {
            KinNative.buildTransaction(JSON.stringify(kinConfig), parseInt(0), this.publicAddress, parseFloat(amount), (error, result) => {
                console.log(error);
                console.log(result);
                if (error) {
                    // this.hideLoader();
                    this.setState({ isProcessing: false });
                    alert(error.cause.detailMessage)
                }
                if (result) {
                    // this.hideLoader();
                    this.setState({ isProcessing: false });
                    this.getKinAccountBalance(accountNumber);
                    alert("Successfully funded!");
                }

                // let a = {
                //     "cause": { "detailMessage": "length\u003d0; index\u003d0", "stackTrace": [], "suppressedExceptions": [] }, "detailMessage": "Invalid addressee public address format", "stackTrace": [], "suppressedExceptions": []
                // }
            });
        }
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
        const { loading, loadingText } = this.state;
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <LinearGradient
                    start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                    locations={[0, 0.5, 0.6]}
                    colors={['#0587FA', '#08B9F3', '#0587FA']}
                    style={[{
                        flex: 1,
                        padding: 15
                    }]}>

                    <Placeholder
                        isReady={this.state.balance ? true : false}
                        animation="fade"
                        whenReadyRender={() => <View style={{ flex: 1, marginTop: 10 }}>
                            <View style={{ alignItems: "center" }}>
                                <Thumbnail source={require('../imgs/5c9b2dd5cce07f21b5f08089_KIN.png')} />
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <View>
                                    <Text style={{ color: "#bbb", fontSize: 20 }}>Public Address</Text>
                                </View>
                                <View style={{ alignItems: "center" }}>
                                    <Text style={{ textAlign: "center", fontSize: 15, color: "white" }}>{this.props.credentials.publicAddress}</Text>
                                    <TouchableOpacity onPress={() => this.copyToClipboard()}>
                                        <Icon type="Ionicons" name="copy" style={{ color: "#ccc" }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginTop: 20 }}>
                                    <View>
                                        <Text style={{ color: "#bbb", fontSize: 20 }}>Balance</Text>
                                    </View>
                                    <View>
                                        <Text style={{ textAlign: "center", fontSize: 15, color: "white" }}>{this.state.balance} KIN</Text>
                                    </View>
                                </View>
                            </View>
                            <Card style={{ padding: 10, marginTop: 100, borderRadius: 10 }}>
                                <View style={{ alignItems: "center" }}>
                                    <Text style={{ color: "#bbb", fontSize: 17 }}>Transfer KIN</Text>
                                </View>
                                <Form style={{ marginTop: 20 }}>
                                    <Item inlineLabel>
                                        <Input placeholder="Amount to transfer" style={styles.inputFormStyle} onChangeText={e => this.amount = e} />
                                    </Item>
                                    <Item inlineLabel>
                                        <Input placeholder="Public Address to fund" style={styles.inputFormStyle} onChangeText={e => this.publicAddress = e} />
                                    </Item>
                                </Form>
                                <View>
                                    <TouchableOpacity
                                        style={{ marginTop: 30, alignItems: "center" }}
                                        disabled={this.state.isProcessing ? true : false}
                                        onPress={() => this.transferKin
                                            (
                                                this.props.credentials.accountNumber,
                                                this.amount
                                            )}
                                    >
                                        <LinearGradient
                                            start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                                            locations={[0, 0.5, 0.6]}
                                            colors={['#1DC2A4', '#1DC2A4', '#1DC2A4']}
                                            style={[{
                                                height: 50,
                                                width: "90%",
                                                alignItems: "center",
                                                borderRadius: 3,
                                                justifyContent: "center"
                                            }]}>
                                            <View style={{ flexDirection: "row" }}>
                                                <View style={{ justifyContent: "center" }}>
                                                    <Text style={styles.textWhite}>Transfer</Text>
                                                </View>
                                                {
                                                    this.state.isProcessing ? <Spinner size="large" color="#bbb" style={{ position: "relative", left: 20 }} /> : null
                                                }
                                            </View>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </Card>
                        </View>}
                    >
                        <Line width="70%" />
                        <Line />
                        <Line />
                        <Line width="30%" />
                        <View style={{ height: 100 }}></View>
                        <Line width="70%" />
                        <Line />
                        <Line />
                        <Line width="30%" />
                        <View style={{ height: 100 }}></View>
                        <Line width="70%" />
                        <Line />
                        <Line />
                        <Line width="30%" />
                        {/* {loading && <Loader loading={loading} text={loadingText} />} */}
                    </Placeholder>
                </LinearGradient >
            </ScrollView >
        );
    }
}

export default KinMarketPlace;