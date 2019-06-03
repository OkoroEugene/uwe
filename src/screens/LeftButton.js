import React from 'react';
import {
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';
import { Icon } from 'native-base';


export default function () {
    return (
        <TouchableOpacity onPress={() => alert("EEEE")}>
            <Icon type="Ionicons" name="ios-menu" />
        </TouchableOpacity >
    );
}