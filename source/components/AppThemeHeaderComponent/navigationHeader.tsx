import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Responsive from "../../utils/Responsive";
import colors from "../../utils/colors";
import { GlobalStyle } from "../../utils/GlobalStyle";
import TimerCmp from "../TimerCmp";
import PlatformType from "../../utils/PlatformType";

export const NavigationHeader = ({
    LeftIcon,
    RightIcon,
    onPressLeft,
    onPressRight,
    containerStyle,
    centerText, checkInBtn, isTimer, elapsedTime, isTitle, leftTitle
}: any) => {

    return (
        <View
            style={{ ...style.container, ...containerStyle }}
        >
            <View style={style.containerIn}>
                {isTitle ?
                    <>
                        <View style={{ ...style.leftTitleContainer }}>
                            <Text style={style.title}>{leftTitle}</Text>
                        </View>
                        <TouchableOpacity onPress={onPressRight} style={{ ...style.rightIconView }}>
                            <TimerCmp mainTimerStyle={style.mainTimerStyle} timetitleStyle={style.timetitleStyle} elapsedTime={elapsedTime} />
                        </TouchableOpacity>
                    </>
                    :
                    <>
                        <TouchableOpacity onPress={onPressLeft} style={{ ...style.leftIconView }}>
                            {LeftIcon && <Image source={LeftIcon} style={{ ...style.leftIconStyle }} tintColor={colors.headerTitleColor} resizeMode="contain" />}
                        </TouchableOpacity>
                        <View style={{ ...style.centerView }}>
                            {centerText && <Text style={style.centerText}>{centerText}</Text>}
                        </View>
                        <TouchableOpacity onPress={onPressRight} style={{ ...style.rightIconView }} disabled={isTimer ? false : true}>
                            {RightIcon ?
                                isTimer && <Image source={RightIcon} style={{ ...style.rightIconStyle }} tintColor={colors.headerTitleColor} resizeMode="contain" />
                                : <TimerCmp mainTimerStyle={style.mainTimerStyle} timetitleStyle={style.timetitleStyle} elapsedTime={elapsedTime} />
                            }
                        </TouchableOpacity>
                    </>
                }

            </View>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        justifyContent: "center",
        flexDirection: "row",
        width: "100%",
        height: PlatformType.android ? Responsive.hp(7) : Responsive.hp(12),
        position: 'absolute',
        top: PlatformType.android ? 10 : 30,
        zIndex: 100,
    },
    containerIn: {
        flexDirection: "row",
        width: "90%",
        justifyContent: "space-between",
        alignItems: "center",
    },
    leftIconStyle: {
        width: PlatformType.android ? Responsive.hp(2.5) : Responsive.hp(1.8),
        height: PlatformType.android ? Responsive.hp(2.5) : Responsive.hp(1.8),
    },
    rightIconStyle: {
        width: PlatformType.android ? Responsive.hp(2.5) : Responsive.hp(2),
        height: PlatformType.android ? Responsive.hp(2.5) : Responsive.hp(2),
    },
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
        ...GlobalStyle.Fonts_B_16,
        fontSize: Responsive.hp(2)
    },
    mainTimerStyle: {
        width: Responsive.wp(25),
        borderRadius: Responsive.hp(3),
        borderWidth: 1,
        borderColor: colors.white,
        height: PlatformType.android ? Responsive.hp(3) : Responsive.hp(2.5),
        justifyContent: 'center',
        backgroundColor: colors.themeGreen
    },
    timetitleStyle: {
        color: colors.white,
        textAlign: 'center',
        fontSize: Responsive.hp(1.8)
    },
    title: {
        color: colors.themeTextBlack,
        ...GlobalStyle.Fonts_B_16,
        fontSize: Responsive.hp(2.4)
    },
    leftTitleContainer: {
        height: Responsive.hp(7),
        width: '75%',
        justifyContent: 'center',
    }
})