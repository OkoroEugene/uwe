import React, { Component } from "react";
import { View, StyleSheet, Platform, Image } from "react-native";
// import Background from "./Background";
import { goToAuth, goHome } from '../Navigation';
import Text from '../AppText';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import config from '../config';

const styles = StyleSheet.create({
    activity: {
        alignSelf: "center"
    },
    text1: {
        color: "white",
        fontSize: 50,
        fontFamily: 'Poppins-Bold'
    },
    text2: {
        color: "red",
        fontSize: 50,
        fontFamily: 'Montserrat-Bold'
    },
    textContainer: {
        flexDirection: 'row',
        alignSelf: "center",
    }
});

const backgroundImage = "../imgs/Android.png";
class Splash extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        AsyncStorage.getItem("TOKEN")
            .then(token => {
                if (!token) {
                    return setTimeout(() => goToAuth(), 4000)
                }
                let data = {
                    token: token
                }
                axios.post(`${config.env.prod.url}/verify`, data).then(function (response) {
                    AsyncStorage.setItem("TOKEN", response.data.token);
                    setTimeout(() => goHome(), 4000)
                }).catch(function (err) {
                    if (err) {
                        return goToAuth();
                    }
                })
            });
    }

    render() {
        return (
            // <Background img={require(backgroundImage)}>

            // </Background>
            <View style={{ flex: 1, backgroundColor: "#CCC", justifyContent: "center", alignItems: "center" }}>
                <Image style={{ width: 100, height: 100 }} source={require('../imgs/logo_mark.png')} />
            </View>
        );
    }
}

export default Splash;
