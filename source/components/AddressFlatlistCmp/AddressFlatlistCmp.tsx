import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import colors from '../../utils/colors'
import Responsive from '../../utils/Responsive'
import { GlobalStyle } from '../../utils/GlobalStyle'
import { images } from '../../utils/images'

export const AddressFlatlistCmp = ({ item }: any) => {
    return (
        <View style={style.itemContainer}>
            <View style={style.itemUpContainer}>
                <View style={style.firstView}>
                    <View style={style.flexView}>
                        <Text numberOfLines={1} style={style.firstTextList}>{`${item.item.text1}`}</Text>
                    </View>
                    <View style={style.flexView}>
                        <Text numberOfLines={1} style={style.secondTextList}>{`${item.item.text2}`}</Text>
                    </View>
                </View>
                <View style={style.secondView}>
                    <View style={style.imageView}>
                        <Image source={images.forward} style={style.image} resizeMode='contain' />
                    </View>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    itemContainer: {
        backgroundColor: colors.white,
        marginBottom: Responsive.hp(2), justifyContent: "space-between",
        alignItems: "center", marginHorizontal: Responsive.wp(1), borderRadius: Responsive.hp(1),
        shadowOffset: { width: 0.2, height: 0.2 },
        shadowColor: colors.black,
        shadowRadius: 1,
        shadowOpacity: 0.1,
        elevation: 5,
        marginTop: Responsive.hp(1.3),
    },
    itemUpContainer: {
        width: "100%",
        backgroundColor: colors.themeSubFontGray,
        flexDirection: "row", justifyContent: "space-between",
        alignItems: "center", paddingHorizontal: Responsive.wp(2),
        paddingVertical: Responsive.hp(2), borderRadius: Responsive.hp(1),
    },
    firstTextList: {
        marginHorizontal: Responsive.wp(1), ...GlobalStyle.Fonts_B_16,
        color: colors.themeFontBlack, flex: 1, marginBottom: Responsive.hp(0.6)
    },
    secondTextList: {
        marginHorizontal: Responsive.wp(1), ...GlobalStyle.Fonts_R_14,
        color: colors.themeBlueGray, flex: 1
    },
    imageView: {
        backgroundColor: colors.white,
        borderRadius: Responsive.hp(1),
        width: Responsive.hp(5),
        height: Responsive.hp(5),
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowOffset: { width: 0.2, height: 0.2 },
        shadowColor: colors.black,
        shadowRadius: 1,
        shadowOpacity: 0.1,
    },
    image: {
        width: Responsive.hp(3.2),
        height: Responsive.hp(1.5),
    },
    flexView: {
        flexDirection: 'row',

    },
    firstView: {
        width: "80%"
    },
    secondView: {
        width: "20%"
    },
})