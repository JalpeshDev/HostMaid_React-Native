import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Responsive from '../../utils/Responsive'
import colors from '../../utils/colors'
import { GlobalStyle } from '../../utils/GlobalStyle'
import PlatformType from '../../utils/PlatformType'

const DateDisplay = ({ data, isCheckDateView, onPressDate, firstItemActive }: any) => {

    return (
        <TouchableOpacity style={{
            ...style.dateView, backgroundColor: isCheckDateView ? colors.themeGreen : colors.white
        }} onPress={() => {
            onPressDate(data)
        }}>
            <View style={style.titleView}>
                <Text style={{
                    ...style.title, color: isCheckDateView ? colors.white : colors.themeTextGrey,
                    fontSize: Responsive.hp(1.9),
                    fontWeight: isCheckDateView ? "700" : "400"
                }}>{data?.date}</Text>
                <Text style={{
                    ...style.title, color: isCheckDateView ? colors.white : colors.themeTextGrey,
                    fontSize: Responsive.hp(1.3), fontWeight: isCheckDateView ? "700" : "400"
                }}>{data?.dayOfWeekName}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default DateDisplay

const style = StyleSheet.create({
    dateView: {
        backgroundColor: colors.themeGreen, borderRadius: Responsive.hp(1.2),
        paddingVertical: Responsive.hp(1.5),
        height: PlatformType.android ? Responsive.hp(8):Responsive.hp(7),
        justifyContent: 'center',
        borderWidth: 0.86,
        borderColor: colors.themeSubFontGray,
        width: PlatformType.android ? Responsive.hp(7):Responsive.hp(6),
        marginHorizontal: Responsive.hp(0.3),
        elevation: 1,
        shadowOffset: { width: 0.2, height: 0.2 },
        shadowColor: "#6B779A50",
        shadowRadius: 1,
        shadowOpacity: 0.1,

    },
    title: { color: colors.themeTextGrey, ...GlobalStyle.Fonts_R_16, textAlign: 'center', },
    styleSelectStyle: {
        borderWidth: 1,
        borderColor: colors.themeTextGrey
    },
    titleView: {
        justifyContent: 'space-between', height: Responsive.hp(5)
    },
})