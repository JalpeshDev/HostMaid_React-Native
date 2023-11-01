import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import colors from '../../utils/colors'
import Responsive from '../../utils/Responsive'
import { GlobalStyle } from '../../utils/GlobalStyle'
import icons from '../../utils/icons'

const RenderImgSlider = ({ item, checkInBtnText, onCheckBoxPress }: any) => {
    return (
        <View style={style.backgroundSlider}>
            <Image source={item.url} style={style.imageSlider} />
            <View style={style.containerTextSlider}>
                <TouchableOpacity style={style.itemCheckView} onPress={() => {
                    onCheckBoxPress(item)
                }}>
                    {item?.isCheck ?
                        icons.checkImg : icons.checkOutLineImg
                    }
                </TouchableOpacity>
                <Text style={style.sliderBottomText}>{checkInBtnText}</Text>
            </View>
        </View>
    )
}

export default memo(RenderImgSlider)

const style = StyleSheet.create({
    backgroundSlider: {
        elevation: 5,
        shadowOffset: { width: 0.2, height: 0.2 },
        shadowColor: colors.whiteGrey60,
        shadowRadius: 1,
        shadowOpacity: 0.1,
        paddingBottom: Responsive.hp(8),
        borderRadius: Responsive.hp(1.5),
        width: "100%",
    },
    imageSlider: {
        height: "100%",
        width: "100%",
        borderRadius: Responsive.hp(1.5), resizeMode: 'contain',
    },
    imgContainer: { marginTop: Responsive.hp(10), flexDirection: "row" },
    itemCheckView: { paddingRight: Responsive.hp(1.2), height: Responsive.hp(8), justifyContent: 'center' },
    containerTextSlider: {
        position: "absolute",
        bottom: 0,
        height: Responsive.hp(8),
        width: '100%',
        borderRadius: Responsive.hp(1.5),
        flexDirection: 'row',
        justifyContent: 'center', alignItems: 'center',
    },
    sliderBottomText: {
        color: colors.headerTitleColor,
        ...GlobalStyle.Fonts_M_15,
        textAlign: 'left',
        flex: 1
    },
})