import React from 'react';
import { Navigation } from 'react-native-navigation';
import App from '../../App';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Splash from './Splash';
import Drawer from './Drawer';
import { Root } from 'native-base';
import LeftButton from './LeftButton';
import KinMarketPlace from './KinMarketPlace';
// import { iconsMap } from './src/helpers/IconsLoader';

const wrapWithToastProvider = Screen => props => (
    <Root>
        <Screen {...props} />
    </Root>
);

export function registerScreens() {
    Navigation.registerComponent('uwe.KinMarketPlace', () => KinMarketPlace);
    Navigation.registerComponent('uwe.leftButton', () => LeftButton);
    Navigation.registerComponent('uwe.Drawer', () => Drawer);
    Navigation.registerComponent('uwe.App', () => App);
    Navigation.registerComponent('uwe.Home', () => wrapWithToastProvider(Home));
    Navigation.registerComponent('uwe.Login', () => wrapWithToastProvider(Login));
    Navigation.registerComponent('uwe.Register', () => wrapWithToastProvider(Register));
    Navigation.registerComponent('uwe.Splash', () => Splash);
}