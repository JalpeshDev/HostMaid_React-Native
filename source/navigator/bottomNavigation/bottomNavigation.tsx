import React from 'react';
import { Pressable } from 'react-native';
import {
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Misc from '../../screen/BottomModule/Misc';
import Photos from '../../screen/BottomModule/Photos';
import Bath from '../../screen/BottomModule/Bath';
import { bottomIconsChange } from '../../utils/generalFunction';
import colors from '../../utils/colors';
import Responsive from '../../utils/Responsive';
import CheckInUnavaibleMap from '../../screen/BottomModule/CheckInUnavaibleMap';
import CodeScreen from '../../screen/BottomModule/CodeScreen';
import { useSelector } from 'react-redux';
import PlatformType from '../../utils/PlatformType';

const Tab = createBottomTabNavigator();

const BottomNavigation = ({ route }: any) => {
    const isClickable = useSelector((state: any) => state.authReducer.isClickable);
    const data = route.params;
    console.log("isClickable-->", isClickable);

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
                    height: PlatformType.android ? Responsive.hp(7) : Responsive.hp(9),
                    backgroundColor: colors.MapDownColor,
                    borderTopWidth: 0
                },
            }}
        >
            {menudata.map((item, index) => (
                <Tab.Screen
                    key={index}
                    name={item.name}
                    component={item.component}
                    options={({ route }) => ({
                        tabBarIcon: ({ color }) => bottomIconsChange(item.name, color),
                        tabBarLabel: item.label,
                        tabBarButton: (props) => (
                            <Pressable
                                {...props}
                                disabled={false} // Control clickability here
                            />
                        ),
                    })}
                    initialParams={{ routeData: data }}
                />
            ))}
        </Tab.Navigator>
    );
};
export default BottomNavigation;
