import React from 'react';
import {
    View,
    Image
} from 'react-native';
import Text from '../../AppText';

export default function (props) {
    return (
        // <View style={{ flex: 1, justifyContent: "center" }}>
        //     <Image source={sleeves} />
        // </View>
        <View style={{ height: "100%", justifyContent: "center", alignSelf: "center", position: "absolute", bottom: 24, marginRight: -10 }}>
            <Image style={{ height: 406, alignSelf: "stretch", aspectRatio: 1 / 1, resizeMode:"contain" }} source={props.sleeves} />
        </View>
    );
}