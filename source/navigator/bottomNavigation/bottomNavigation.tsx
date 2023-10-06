import React from 'react';
import { Platform, View, StyleSheet, Pressable, Dimensions } from 'react-native';
import {
    BottomTabBar,
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screen/HomeScreen';
import CodeScreen from '../../screen/CodeModule';
import Misc from '../../screen/BottomModule/Misc';
import Photos from '../../screen/BottomModule/Photos';
import Bath from '../../screen/BottomModule/Bath';
import { bottomIconsChange } from '../../utils/generalFunction';
import colors from '../../utils/colors';
import Responsive from '../../utils/Responsive';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CheckInUnavaibleMap from '../../screen/MapModule/CheckInUnavaibleMap';
const Stack = createNativeStackNavigator();


const { width } = Dimensions.get('window');

const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
    //  const stackBottomData: { name: string, component: any }[] = [
    //     { name: 'Map', component:  },
    //     { name: 'Profile', component: Profile },
    // ];
    // const mapModule = () => {
    //     return (
    //       <Stack.Navigator
    //         initialRouteName={"Map"}
    //         screenOptions={{
    //           headerShown: false,
    //         }}
    //       >
    //         {stackBottomData.map((item: any, index: number) => {
    //           return (
    //             <Stack.Screen
    //               key={index}
    //               name={item.name}
    //               component={item.component}
    //             />
    //           );
    //         })}
    //       </Stack.Navigator>
    //     );
    //   };
    const menudata = [
        { name: 'Map', component: CheckInUnavaibleMap, label: "Map" },
        { name: 'Codes', component: CodeScreen, label: "Codes/Parking" },
        { name: 'Bath', component: Bath, label: "Bed/Bath" },
        { name: 'Misc', component: Misc, label: "Misc" },
        { name: 'Photos', component: Photos, label: "Notes/Photos" },
    ];
    return (
        <Tab.Navigator
            initialRouteName={'Map'}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.active,
                tabBarInactiveTintColor: colors.deActive,
                tabBarHideOnKeyboard: false,
                tabBarShowLabel: true,
                tabBarStyle: {
                    height: Responsive.hp(7),
                    backgroundColor: colors.MapDownColor,
                },
            }}>
            {menudata.map((item, index) => (
                <Tab.Screen
                    key={index}
                    name={item.name}
                    component={item.component}
                    options={({ route }) => ({
                        tabBarIcon: ({ color }) => bottomIconsChange(item.name, color),
                        // tabBarStyle: (route => checkHideTab(route))(route),
                        tabBarLabel: item.label,
                    })}
                />
            ))}
        </Tab.Navigator>
    );
};
export default BottomNavigation;

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'red',
        borderRadius: 10,
        marginHorizontal: width * 0.01,
    },
    mainItemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 1,
        borderColor: '#333B42',
    },
});
