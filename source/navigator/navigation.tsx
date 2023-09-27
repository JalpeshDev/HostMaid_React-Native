import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import * as React from 'react';
import navigationServices from './navigationServices';
import { localStorage } from '../utils/localStorageProvider';
import { LocalStorageKey } from '../utils/strings';
import StackNavigation from './stackNavigation/stackNavigation';
export default function Navigation() {
    const NewDefaultTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: 'white',
        },
    };

    return (
        <NavigationContainer
            ref={(navigatorRef: any) => {
                navigationServices.setTopLevelNavigator(navigatorRef);
            }}
            theme={NewDefaultTheme}>
            <RootNavigator />
        </NavigationContainer>
    );
}

function RootNavigator() {
    const isLogin = localStorage.getItemString(LocalStorageKey.isLoggedIn);
    console.log('isLogin==>', isLogin);
    return <StackNavigation />
    //   return isLogin ? <DrawerNavigation /> : <StackNavigation />;
}

