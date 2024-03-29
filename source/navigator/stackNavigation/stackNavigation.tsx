import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../../screen/LoginModule/Splash';
import routes from '../routes';
import Login from '../../screen/LoginModule/Login';
import Welcome from '../../screen/LoginModule/Welcome';
import HomeScreen from '../../screen/HomeScreen';
import BottomNavigation from '../bottomNavigation/bottomNavigation';

const Stack = createNativeStackNavigator();
export default function StackNavigation() {
    const stackData: any[] = [
        { name: routes.Splash, component: Splash },
        { name: routes.Welcome, component: Welcome },
        { name: routes.Login, component: Login },
        { name: routes.HomeScreen, component: HomeScreen },
        { name: routes.BottomNavigation, component: BottomNavigation },
    ];
    return (
        <Stack.Navigator
            initialRouteName={routes.Splash}
            screenOptions={{
                headerShown: false,
            }}>
            {stackData.map((item, index) => {
                return (
                    <Stack.Screen
                        key={index}
                        name={item.name}
                        component={item.component}
                    />
                );
            })}
        </Stack.Navigator>
    );
}
