import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Responsive from '../../utils/Responsive'
import colors from '../../utils/colors'
import { GlobalStyle } from '../../utils/GlobalStyle'

const CodeCmp = ({ label, number, onPressNumberBox }: any) => {

    return (
        <View style={style.container}>
            <View style={style.sunContainer}>
                <Text style={style.labelStyle}>{label}</Text>
                <View style={style.rightContainBG}>
                    {label === "Parking Info" ?
                        <Text style={style.content}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </Text>
                        :
                        number.number && number.number.map((item: any, index: any) => {
                            return (
                                <TouchableOpacity key={index} style={style.boxStyle} onPress={() => onPressNumberBox(item, number.id)}>
                                    <Text style={style.numberStyle}>{item?.key}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }

                </View>
            </View>
        </View>
    )
}

export default CodeCmp

const style = StyleSheet.create({
    container: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Responsive.hp(4)
    },
    sunContainer: {
        width: "90%",
    },
    labelStyle: {
        color: colors.themeTextBlack,
        ...GlobalStyle.Fonts_B_16
    },
    numberStyle: {
        color: colors.themeTextBlack,
        ...GlobalStyle.Fonts_B_16
    },
    rightContainBG: {
        flexDirection: "row",
        justifyContent: 'space-between',
        width: "65%",
        paddingTop: Responsive.hp(4)
    },
    boxStyle: {
        height: Responsive.hp(6),
        width: Responsive.hp(6),
        backgroundColor: colors.numberBox,
        borderRadius: Responsive.hp(1),
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        color: colors.locationText,
        ...GlobalStyle.Fonts_M_15
    }
})