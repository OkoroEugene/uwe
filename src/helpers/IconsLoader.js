import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// define your suffixes by yourself..
// here we use active, big, small, very-big..
const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const icons = {
    "ios-person": [20, "#bbb"],
    "ios-person--big": [50, "#bbb"],

    "ios-send": [20, "#bbb"],
    "ios-menu": [30, "#bbb"],

    "ios-person--active": [20, "#fff"],
    "ios-person--active--big": [50, "#fff"],
    "ios-person--active--very-big": [100, "#fff"],

    "ios-people": [20, "#bbb"],
    "ios-people--active": [20, "#fff"],

    "ios-home": [20, "#bbb"],
    "ios-log-out": [20, "#bbb"],
    "ios-bookmark": [20, "#bbb"],
    "ios-notifications": [20, "#bbb"],
    "ios-search": [20, "#bbb"],
    "ios-contact": [20, "#bbb"],
    "ios-videocam": [60, "#bbb"],
    "ios-settings": [60, "#bbb"],
    "ios-camera": [40, "#bbb"],
    "ios-arrow-round-forward": [50, "#71cd53"],

    "ios-keypad": [20, "#bbb"],
    "ios-keypad--active": [20, "#fff"],
    "ios-checkmark-circle-outline": [60, "#71cd53"],
    "ios-close-circle-outline": [60, "#d25454"],

    "ios-chatbubbles": [20, "#bbb"],
    "ios-chatbubbles--active": [20, "#fff"],

    // Use other Icon provider, see the logic at L39
    "facebook": [20, "#bbb", FontAwesome],
    "facebook--active": [20, "#fff", FontAwesome],
}

const defaultIconProvider = Ionicons;

let iconsMap = {};
let iconsLoaded = new Promise((resolve, reject) => {
    Promise.all(
        Object.keys(icons).map(iconName => {
            const Provider = icons[iconName][2] || defaultIconProvider; // Ionicons
            return Provider.getImageSource(
                iconName.replace(replaceSuffixPattern, ''),
                icons[iconName][0],
                icons[iconName][1]
            )
        })
    ).then(sources => {
        Object.keys(icons)
            .forEach((iconName, idx) => iconsMap[iconName] = sources[idx])

        // Call resolve (and we are done)
        resolve(true);
    })
});

export {
    iconsMap,
    iconsLoaded
};