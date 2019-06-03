import React from 'react';
import {
    View,
    Image
} from 'react-native';
import Text from '../../AppText';

function Body(props) {
    return (
        <View style={{ height: "100%", justifyContent: "center", alignSelf: "center", position: "absolute", bottom: 0, top: 0 }}>
            <Image style={{ width: 350, height: 350, alignSelf: "stretch", aspectRatio: 1 / 2 }} source={props.body} />
        </View>
    );
}

export default Body;