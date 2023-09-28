import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Responsive from '../../utils/Responsive'
import PlatformType from '../../utils/PlatformType'
import icons from '../../utils/icons'
import { GlobalStyle } from '../../utils/GlobalStyle'
import colors from '../../utils/colors'

const MapAddressCmp = ({ icon }: any) => {
    return (
        <View
            style={style.container}
        >
            <View style={style.containerIn}>
                <View style={style.logoBg}>
                    <Image source={icon} style={style.iconsView} />
                </View>
                <Text style={style.title}>
                    81-83 Campbell Street,Surry Hills, NSW 2010, Street,Surry Hills, Australia
                </Text>
            </View>
        </View>
    )
}

export default MapAddressCmp

const style = StyleSheet.create({
    container: {
        justifyContent: "center",
        flexDirection: "row",
        width: "100%",
        maxHeight: Responsive.hp(10),
        minHeight: Responsive.hp(7),
        marginTop: Responsive.hp(2)
    },
    containerIn: {
        flexDirection: "row",
        // width: "84%",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.white,
        borderRadius: Responsive.hp(1),
        maxWidth: "85%",
        minWidth: "85%"
    },
    title: {
        color: colors.locationText,
        textAlignVertical: 'center',
        ...GlobalStyle.Fonts_M_15,
        maxWidth: "83%",
        minWidth: "83%"
    },
    rightIcons: { width: Responsive.wp(1), height: Responsive.hp(5), },
    iconsView: { width: Responsive.wp(5), height: Responsive.hp(3.1), },
    logoBg: {
        width: Responsive.wp(15), height: Responsive.hp(5),
        justifyContent: 'center', alignItems: 'center'
    },
})