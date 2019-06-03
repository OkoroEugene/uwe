import React from "react";
import {
	StyleSheet,
	Dimensions
} from "react-native";

export default StyleSheet.create({
	backgroundImage: {
		resizeMode: "cover",
		flex: 1,
		width: null,
		height: null
	},
	containerStyle: {
		borderWidth: 1,
		borderRadius: 2,
		borderColor: '#ddd',
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 1,
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10,
		padding: 40
	},
	fullContainer: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "#EBEDEC"
	},
	serviceBtn: {
		// width: 70,
		// height: 70,
		width: 100,
		height: 100,
		borderRadius: 100 / 2,
		justifyContent: "center"
	},
	pageLayout: {
		alignItems: "stretch",
		flex: 1
	},
	inputFormStyle: {
		fontFamily: 'Sofia Pro Regular',
		fontSize: 18
	},
	backgroundImageWrapper: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%"
	},
	defaultFont: {
		fontFamily: 'Sofia Pro Regular',
		fontSize: 16
	},
	placeholder: {
		fontFamily: 'Sofia Pro Regular',
		fontSize: 18,
		color: "#afafaf"
	},
	defaultGrayTextColor: {
		color: "#B0B1AD"
	},
	placeholderError: {
		fontFamily: 'OpenSans-Regular',
		fontSize: 14,
		color: "#f12828"
	},
	container: {
		flex: 1,
		padding: 40,
		// flexDirection: "column",
		justifyContent: "center",
		backgroundColor: "#EBEDEC"
		// paddingTop: 200
	},
	modalContainer: {
		flex: 1,
		// alignItems: 'center',
		padding: 100,
		borderRadius: 5,
		justifyContent: 'center',
		backgroundColor: '#ecf0f1',
	},
	button: {
		paddingTop: 20
	},
	textWhite: {
		color: "white"
	},
	iconAlign: {
		marginLeft: 10
	},
	accountText: {
		flexDirection: "row",
		marginTop: 10,
		alignSelf: "center"
	},
	textGray: {
		color: "#9b9b9b",
		fontFamily: "Sofia Pro Regular"
	},
	iconText: {
		fontSize: 12,
		alignSelf: "center",
		// padding: 2,
		position: "relative",
		top: 3
	},
	circle: {
		width: 30,
		height: 30,
		borderRadius: 30 / 2,
		backgroundColor: "#03edf5"
	},
	imgOverlay: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 33,
		right: 0,
		fontSize: 25,
		color: "red",
		width: 25,
		height: 25,
		borderRadius: 25 / 2,
		backgroundColor: "white",
		paddingLeft: 2.2,
		paddingBottom: 1.8
	},
	avatarOverlay: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 63,
		right: 0,
		// fontSize: 25,
		width: 30,
		height: 30,
		borderRadius: 30 / 2,
		backgroundColor: "white",
		paddingLeft: 2.2,
		paddingBottom: 1.8
	},
	iconOverlay: {
		marginLeft: 2.8,
		color: "#D21F3C",
		fontSize: 25
	},
	circleGray: {
		width: 20,
		height: 20,
		borderRadius: 20 / 2,
		backgroundColor: "#03edf573",
	},
	backgroundVideo: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		aspectRatio: 1,
		height: "100%",
		width: "100%"
		// resizeMode: "cover"
	},
	activeIcon: {
		color: "#71cd53",
		fontSize: 25
	},
	btnDefault: {
		backgroundColor: "#FEA610"
	},
	btnRound: {
		backgroundColor: "white",
		width: 50,
		height: 50,
		borderRadius: 50 / 2,
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "#ddd",
		borderBottomWidth: 0,
		shadowColor: "red",
		// shadowOffset: { height: 0, width: 2 },
		shadowOpacity: 0.75,
		shadowRadius: 5,
		elevation: 1
	},
	defaultColor: {
		color: "#FEA610"
	},
	reactionContainer: {
		// paddingLeft: 10,
		width: 62,
		borderRightWidth: 1,
		borderColor: "#CCC",
		marginTop: -12,
		marginBottom: -8,
		flexDirection: "column",
	},
	reactionIcon: {
		fontSize: 22,
		alignSelf: "center",
		marginTop: 7,
		padding: 5
		// marginRight: 24
	},
	linearGradient: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15,
		borderRadius: 0
	},
	buttonText: {
		fontSize: 18,
		fontFamily: 'Gill Sans',
		textAlign: 'center',
		margin: 10,
		color: '#ffffff',
		backgroundColor: 'transparent',
	},
	thumbnailShadowLarge: {
		backgroundColor: 'white',
		width: 85,
		height: 85,
		borderRadius: 85 / 2,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 1,
		shadowColor: '#000',
		borderColor: '#ddd'
	},
	thumbnailShadowSmall: {
		backgroundColor: 'white',
		width: 60,
		height: 60,
		borderRadius: 60 / 2,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 1,
		shadowColor: '#000',
		borderColor: '#ddd'
	},
	cameraContainer: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'black'
	},
	cameraPreview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	cameraCapture: {
		flex: 0,
		backgroundColor: '#fff',
		borderRadius: 5,
		padding: 15,
		paddingHorizontal: 20,
		alignSelf: 'center',
		margin: 20
	},
	streamVolumeBtn: {
		alignContent: "center",
		justifyContent: "center",
		width: 40,
		height: 40,
		borderWidth: 2,
		borderColor: "#CCC",
		borderRadius: 40 / 2
	},
	settingsDesc: {
		fontSize: 12,
		textAlign: "center",
		color: "#bbb"
	},
	settingsMain: {
		fontSize: 20,
		textAlign: "center",
		color: "white"
	},
	videoPlayIcon: {
		position: "absolute",
		width: 120,
		height: 120,
		alignItems: "center",
		backgroundColor: "black",
		opacity: 0.3,
		justifyContent: "center"
	},
	textNext: {
		fontSize: 20,
		color: "white"
	},
	btnNext: {
		width: "100%",
		justifyContent: "center",
		backgroundColor: "#39AB39"
	},
	accountCard: {
		padding: 0,
		marginTop: -1
	},
	cardModal: {
		borderBottomWidth: 1,
		borderBottomColor: "#E5EAED",
		justifyContent: "center"
	},
	footerContainer: {
		marginTop: 5,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 10,
	},
	footerText: {
		fontSize: 14,
		fontFamily: "Sofia Pro Italic",
		color: '#aaa',
	},
	notificationUserText: {
		color: '#FEA610',
		fontFamily: "Sofia Pro Italic"
	}
});
