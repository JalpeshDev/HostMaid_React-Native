import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Responsive from "../../utils/Responsive";
import colors from "../../utils/colors";
import PlatformType from "../../utils/PlatformType";
import { images } from "../../utils/images";
import { GlobalStyle } from "../../utils/GlobalStyle";
import Fonts from "../../utils/Fonts";


export const AppThemeHeaderComponent = ({
    isLeft,
    LeftIcon,
    RightIcon,
    RightLeftIcon,
    isRight,
    isRightLeft,
    onPressRight,
    onPressRightLeft,
    header,
    title1,
    title2,
    imgStyle
}: any) => {
    const dynamicStyles: any = {
        width: header ? '90%' : '86%',
    }
    const dynamicStyles2: any = {
        backgroundColor: header ? colors.white : colors.MapDownColor
    }
    return (
        <View
            style={style.container}
        >
            <View style={[style.containerIn, dynamicStyles]}>
                {header ?
                    <View>
                        <Text style={style.title1}>{title1}</Text>
                        <Text style={style.title2}>{title2}</Text>
                    </View> :
                    <View style={style.rightContainBG}>
                        <Image source={images.avtarImg} style={style.logoBg} resizeMode='contain' />
                        <Text style={style.title}>
                            Aleksandr V.
                        </Text>
                    </View>
                }


                <View style={[style.rightContainBG, { width: header === true ? Responsive.wp(30) : Responsive.wp(25), justifyContent: 'space-around' }]}>
                    <TouchableOpacity
                        style={[style.imgView, dynamicStyles2]}
                        onPress={() => {
                            onPressRightLeft()
                        }}
                    >
                        <Image source={LeftIcon} style={{ ...style.iconsView, ...imgStyle, }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={style.imgView}
                        onPress={() => {
                            onPressRight()
                        }}
                    >
                        <Image source={RightIcon} style={{ ...style.iconsView, ...imgStyle }} />
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
        height: Responsive.hp(7),
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
    iconsView: { width: Responsive.wp(10.1), height: Responsive.hp(5), },
    imgStyle: { width: Responsive.wp(6), height: Responsive.hp(4), },
    imgView: {
        height: Responsive.hp(6), width: Responsive.hp(6),
        justifyContent: 'center',
        alignItems: 'center', borderRadius: Responsive.hp(1),

    },
    title1: {
        color: colors.themeTextBlack,
        ...GlobalStyle.Fonts_R_14

    },
    title2: {
        color: colors.themeTextBlack,
        ...GlobalStyle.Fonts_B_16
    },
    subContainer: {
        width: "90%",
    }

})