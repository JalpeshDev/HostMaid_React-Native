import { StyleSheet, Text, Image, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { memo } from 'react'
import colors from '../../utils/colors'
import Responsive from '../../utils/Responsive'
import { GlobalStyle } from '../../utils/GlobalStyle'
import icons from '../../utils/icons'
import PlatformType from '../../utils/PlatformType'

const RenderImgSlider = ({ item, checkInBtnText, onCheckBoxPress }: any) => {

    return (
        <View style={style.backgroundSlider}>
            <Image source={item.url} style={style.imageSlider} />
            <ScrollView style={style.containerTextSlider}>
                {item?.checkList &&
                    item?.checkList.map((element: any, index: number) => {
                        return (
                            <View style={style.checkContainer}>
                                <TouchableOpacity style={style.itemCheckView} onPress={() => {
                                    onCheckBoxPress(index, item.id)
                                }}>
                                    {element?.isCheck ?
                                        icons.checkImg : icons.checkOutLineImg
                                    }
                                </TouchableOpacity>
                                <Text style={style.sliderBottomText}>{element?.checkList}</Text>
                            </View>
                        )
                    })
                }
            </ScrollView>
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
        paddingBottom: Responsive.hp(35),
        borderRadius: Responsive.hp(1.5),
        width: "100%",
    },
    imageSlider: {
        height: "100%",
        width: "100%",
        borderRadius: Responsive.hp(1.5), resizeMode: 'cover',
    },
    checkContainer: { flexDirection: "row", paddingVertical: Responsive.hp(1) },
    itemCheckView: {
        paddingRight: Responsive.hp(1.2),
    },
    containerTextSlider: {
        position: "absolute",
        bottom: 0,
        height: Responsive.hp(35),
        width: '100%',
        borderRadius: Responsive.hp(1.5),
    },
    sliderBottomText: {
        color: colors.headerTitleColor,
        ...GlobalStyle.Fonts_M_15,
        textAlign: 'left',
        flex: 1,
    },
})