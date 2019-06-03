// navigation.js
import { Navigation } from 'react-native-navigation'
import { iconsMap } from './helpers/IconsLoader';

export const goToAuth = () => Navigation.setRoot({
    root: {
        bottomTabs: {
            id: 'BottomTabsId',
            children: [
                {
                    component: {
                        name: 'uwe.Login',
                        options: {
                            bottomTab: {
                                fontSize: 12,
                                text: 'Sign In',
                                icon: require('./imgs/signIn.png')
                            },
                            topBar: {
                                visible: false
                            }
                        }
                    },
                },
                {
                    component: {
                        name: 'uwe.Register',
                        options: {
                            bottomTab: {
                                text: 'Sign Up',
                                fontSize: 12,
                                icon: require('./imgs/signUp.png')
                            },
                            topBar: {
                                visible: false
                            }
                        }
                    },
                },
            ],
        }
    }
});

export const goHome = () => Navigation.setRoot({
    root: {
        stack: {
            id: 'App',
            children: [
                {
                    // component: {
                    //     name: 'uwe.Home',
                    //     options: {
                    //         title: {
                    //             text: "Home"
                    //         }
                    //     },
                    // },
                    sideMenu: {
                        id: "sideMenu",
                        left: {
                            component: {
                                id: "Drawer",
                                name: "uwe.Drawer",
                            }
                        },
                        center: {
                            stack: {
                                id: "AppRoot",
                                children: [{
                                    component: {
                                        id: "App",
                                        name: "uwe.Home",
                                        options: {
                                            topBar: {
                                                title: {
                                                    text: "Home"
                                                },
                                                leftButtons: [
                                                    {
                                                        id: 'drawer',
                                                        icon: iconsMap["ios-menu"]
                                                    }
                                                ],
                                                // rightButtons: [
                                                //     {
                                                //         id: 'logout',
                                                //         icon: iconsMap["ios-log-out"]
                                                //     }
                                                // ],
                                            }
                                        },
                                    }
                                }]
                            }
                        }
                    }
                }
            ],
        }
    }
})