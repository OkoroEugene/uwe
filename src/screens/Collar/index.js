import React from 'react';
import {
    View,
    Image
} from 'react-native';
import Text from '../../AppText';

function Collar(props) {
    return (
        // <View style={{ flex: 1, justifyContent: "center" }}>
        //     <Image source={props.collar} />
        // </View>
        <View style={{ height: "100%", justifyContent: "center", alignSelf: "center", position: "relative", bottom: 154, elevation: 1, left: 9 }}>
            <Image style={{ width: 110, height: 110, alignSelf: "stretch", aspectRatio: 2 / 1, resizeMode: "contain" }} source={props.collar} />
        </View>
    );
}

export default Collar;