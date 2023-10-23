import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Responsive from "../../utils/Responsive";
import colors from "../../utils/colors";
import { GlobalStyle } from "../../utils/GlobalStyle";
import TimerCmp from "../TimerCmp";

export const NavigationHeader = ({
    LeftIcon,
    RightIcon,
    onPressLeft,
    onPressRight,
    containerStyle,
    centerText, checkInBtn, timer
}: any) => {

    return (
        <View
            style={{ ...style.container, ...containerStyle }}
        >
            <View style={style.containerIn}>
                <TouchableOpacity onPress={onPressLeft} style={{ ...style.leftIconView }}>
                    <Image source={LeftIcon} style={{ ...style.leftIconStyle }} tintColor={colors.headerTitleColor} resizeMode="contain" />
                </TouchableOpacity>
                <View style={{ ...style.centerView }}>
                    {centerText && <Text style={style.centerText}>{centerText}</Text>}
                </View>
                <TouchableOpacity onPress={onPressRight} style={{ ...style.rightIconView }}>
                    {RightIcon ?
                        timer && <Image source={RightIcon} style={{ ...style.rightIconStyle }} tintColor={colors.headerTitleColor} resizeMode="contain" />
                        : <TimerCmp mainTimerStyle={style.mainTimerStyle} timetitleStyle={style.timetitleStyle} />
                    }
                </TouchableOpacity>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        justifyContent: "center",
        flexDirection: "row",
        width: "100%",
        height: Responsive.hp(7),
        position: 'absolute', top: 10, zIndex: 100,
    },
    containerIn: {
        flexDirection: "row",
        width: "90%",
        justifyContent: "space-between",
        alignItems: "center",
    },
    leftIconStyle: { width: Responsive.hp(2.5), height: Responsive.hp(2.5), },
    rightIconStyle: { width: Responsive.hp(2.5), height: Responsive.hp(2.5), },
    leftIconView: {
        height: Responsive.hp(7),
        // width: Responsive.hp(7),
        width: '25%',
        justifyContent: 'center',
    },
    rightIconView: {
        height: Responsive.hp(7), width: '25%',
        justifyContent: 'center', alignItems: 'flex-end',
    },
    centerView: {
        height: Responsive.hp(7),
        width: '50%',
        justifyContent: 'center',
    },
    centerText: {
        textAlign: 'center',
        color: colors.active,
        ...GlobalStyle.Fonts_B_16
    },
    mainTimerStyle: {
        width: Responsive.wp(21),
        borderRadius: Responsive.hp(3),
        borderWidth: 1,
        borderColor: colors.white,
        height: Responsive.hp(3),
        justifyContent: 'center',
        backgroundColor: colors.themeGreen
    },
    timetitleStyle: {
        color: colors.white,
        textAlign: 'center',
        fontSize: Responsive.hp(1.2)
    },
})