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
                <View style={style.iconsView}>
                    <Image source={icon} style={style.logoBg} resizeMode='contain' />
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
        marginTop: PlatformType.android ? Responsive.hp(2):Responsive.hp(1),
    },
    containerIn: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.white,
        borderRadius: Responsive.hp(1),
        maxWidth: "85%",
        minWidth: "85%",
        elevation: 1,
        shadowOffset: { width: 0.2, height: 0.2 },
        shadowColor: colors.black,
        shadowRadius: 1,
        shadowOpacity: 0.1,
    },
    title: {
        color: colors.locationText,
        textAlignVertical: 'center',
        ...GlobalStyle.Fonts_M_15,
        maxWidth: "83%",
        minWidth: "83%",
        fontSize:PlatformType.android ? Responsive.hp(1.7) : Responsive.hp(1.4)
    },
    rightIcons: { width: Responsive.wp(1), height: Responsive.hp(5), },
    logoBg: { width: Responsive.wp(5), height: Responsive.hp(2.5), },
    iconsView: {
        width: Responsive.wp(13), height: Responsive.hp(5),
        justifyContent: 'center', alignItems: 'center',
    },
})