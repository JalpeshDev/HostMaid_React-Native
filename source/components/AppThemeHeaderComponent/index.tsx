import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Responsive from "../../utils/Responsive";
import colors from "../../utils/colors";
import PlatformType from "../../utils/PlatformType";
import { images } from "../../utils/images";
import { GlobalStyle } from "../../utils/GlobalStyle";


export const AppThemeHeaderComponent = ({
    isLeft,
    LeftIcon,
    RightIcon,
    RightLeftIcon,
    isRight,
    isRightLeft,
    onPressRight,
    onPressRightLeft,
}: any) => {
    return (
        <View
            style={style.container}
        >
            <View style={style.containerIn}>
                <View style={style.rightContainBG}>
                    <Image source={images.avtarImg} style={style.logoBg} resizeMode='contain' />
                    <Text style={style.title}>
                        Aleksandr V.
                    </Text>
                </View>

                <View style={[style.rightContainBG, { width: Responsive.wp(25), justifyContent: 'space-around' }]}>
                    <TouchableOpacity
                        onPress={() => {
                            onPressRightLeft()
                        }}
                    >
                        <Image source={LeftIcon} style={style.iconsView} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            onPressRight()
                        }}
                    >
                        <Image source={RightIcon} style={style.iconsView} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        justifyContent: "center",
        flexDirection: "row",
        width: "100%",
        height: Responsive.hp(6),
    },
    containerIn: {
        flexDirection: "row",
        width: "86%",
        justifyContent: "space-between",
        alignItems: "center",
        // paddingHorizontal: PlatformType.ios ? Responsive.wp(6) : Responsive.wp(5),
    },
    logoBg: { width: Responsive.wp(15), height: Responsive.hp(5), },
    rightContainBG: { flexDirection: "row", },

    title: {
        color: colors.headerTitleColor,
        textAlign: 'center',
        textAlignVertical: 'center',
        ...GlobalStyle.Fonts_R_14
    },
    rightIcons: { width: Responsive.wp(1), height: Responsive.hp(5), },
    iconsView: { width: Responsive.wp(10.1), height: Responsive.hp(5), }
})