import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Responsive from '../../utils/Responsive'
import colors from '../../utils/colors'
import { GlobalStyle } from '../../utils/GlobalStyle'
import PlatformType from '../../utils/PlatformType'

const CodeCmp = ({ label, number, onPressNumberBox }: any) => {
    console.log("numebr--->", number.number);


    return (
        <View style={style.container}>
            <View style={style.sunContainer}>
                <Text style={style.labelStyle}>{label}</Text>
                <View style={style.rightContainBG}>
                    {label === "Parking Info" ?
                        <Text style={[style.content]}>
                            {number.value}
                        </Text>
                        :
                        number.number && number.number.map((item: any, index: any) => {
                            console.log("item");

                            return (
                                <TouchableOpacity key={index} style={style.boxStyle}
                                // onPress={() => onPressNumberBox(item, number.id)}
                                >
                                    <Text style={style.numberStyle}>{item}</Text>
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
        paddingTop: Responsive.hp(3),
    },
    sunContainer: {
        width: "90%",
    },
    labelStyle: {
        color: colors.themeTextBlack,
        ...GlobalStyle.Fonts_M_15,
        fontSize: Responsive.hp(1.9)
    },
    numberStyle: {
        color: colors.themeTextBlack,
        ...GlobalStyle.Fonts_B_16,
    },
    rightContainBG: {
        flexDirection: "row",
        justifyContent: 'space-between',
        width: "65%",
        paddingTop: Responsive.hp(3.5),
    },
    boxStyle: {
        height: PlatformType.android ? Responsive.hp(6) : Responsive.hp(5),
        width: PlatformType.android ? Responsive.hp(6) : Responsive.hp(5),
        backgroundColor: colors.numberBox,
        borderRadius: Responsive.hp(1),
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1,
        shadowOffset: { width: 0.2, height: 0.2 },
        shadowColor: colors.black,
        shadowRadius: 1,
        shadowOpacity: 0.1,
    },
    content: {
        color: colors.locationText,
        ...GlobalStyle.Fonts_M_15
    }
})