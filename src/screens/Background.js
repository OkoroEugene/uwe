import React from "react";
import { View, Image } from "react-native";
// import commonStyles from "../styles";
export default function(props) {
	return (
		<View style={commonStyles.pageLayout}>
			<View style={commonStyles.backgroundImageWrapper}>
				<Image
					style={commonStyles.backgroundImage}
					source={props.img}
				/>
			</View>
			<View
				style={{
					flex: 1,
					flexDirection: "column",
					alignItems: "stretch",
					justifyContent: "center"
				}}
			>
				{props.children}
			</View>
		</View>
	);
}
