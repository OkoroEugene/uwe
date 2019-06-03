import React from 'react';
import {
    View,
    Image
} from 'react-native';
import Text from '../../AppText';

function Cuffs(props) {
    return (
        <View style={{ height: "100%", justifyContent: "center", alignSelf: "center", position: "absolute" }}>
            <Image style={{ width: 350, height: 300, alignSelf: "stretch" }} source={props.cuffs} />
        </View>
    );
}

export default Cuffs;