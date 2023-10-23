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
    imgStyle,
    onDateSelect
}: any) => {
    const containerInStyleObj: any = {
        width: header ? '90%' : '86%',
    }
    const imgViewStylesObj: any = {
        backgroundColor: header ? colors.white : colors.MapDownColor,
        elevation: header ? 3 : 0,
        shadowOffset: { width: 0.2, height: 0.2 },
        shadowColor: colors.black,
        shadowRadius: 1,
        shadowOpacity: 0.1,
        height: Responsive.hp(4.5), width: Responsive.hp(4.5),
    }
    return (
        <View
            style={style.container}
        >
            <View style={[style.containerIn, containerInStyleObj]}>
                {header ?
                    <TouchableOpacity onPress={onDateSelect}>
                        <Text style={style.title1}>{title1}</Text>
                        <TouchableOpacity onPress={onDateSelect}>
                            <Text style={style.title2}>{title2}</Text>
                        </TouchableOpacity>
                    </TouchableOpacity> :
                    <View style={style.rightContainBG}>
                        <Image source={images.avtarImg} style={style.logoBg} resizeMode='contain' />
                        <Text style={style.title}>
                            Aleksandr V.
                        </Text>
                    </View>
                }


                <View style={{ ...style.rightContainBG, width: header ? Responsive.wp(21) : Responsive.wp(23), }}>
                    <TouchableOpacity
                        style={[style.imgView, imgViewStylesObj]}
                        onPress={() => {
                            onPressRightLeft("+1 123-456-7890")
                        }}
                    >
                        <Image source={LeftIcon} style={{ ...style.iconsView, ...imgStyle, }} resizeMode='contain' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ ...style.imgView, paddingBottom: 5, alignItems: header ? 'flex-end' : 'center', }}
                        onPress={() => {
                            onPressRight()
                        }}
                    >
                        <Image source={RightIcon} style={{ ...style.iconsView, ...imgStyle }} resizeMode='contain' />
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
    },
    logoBg: { width: Responsive.wp(15), height: Responsive.hp(5), },
    rightContainBG: {
        flexDirection: "row", width: Responsive.wp(23),
        justifyContent: 'space-between',
    },

    title: {
        color: colors.headerTitleColor,
        textAlign: 'center',
        textAlignVertical: 'center',
        ...GlobalStyle.Fonts_R_14
    },
    rightIcons: { width: Responsive.wp(1), height: Responsive.hp(5), },
    iconsView: { width: Responsive.hp(5), height: Responsive.hp(5), },
    imgStyle: { width: Responsive.wp(6), height: Responsive.hp(4), },
    imgView: {
        height: Responsive.hp(5.5), width: Responsive.hp(5.5),
        justifyContent: 'center',
        alignItems: 'center', borderRadius: Responsive.hp(1),
    },
    title1: {
        color: colors.themeTextBlack,
        ...GlobalStyle.Fonts_R_14,
        fontSize: Responsive.hp(1.3)
    },
    title2: {
        color: colors.themeTextBlack,
        ...GlobalStyle.Fonts_B_16,
        paddingTop: Responsive.hp(0.3)
    },
    subContainer: {
        width: "90%",
    }

})