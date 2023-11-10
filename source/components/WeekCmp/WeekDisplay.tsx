import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Responsive from '../../utils/Responsive'
import colors from '../../utils/colors'
import { GlobalStyle } from '../../utils/GlobalStyle'
import PlatformType from '../../utils/PlatformType'
const WeekDisplay = ({ keyIndex, data, isCheckWeekView, onPressWeek, numberOfWeek }: any) => {

    return (
        <TouchableOpacity style={{
            ...style.weekView,
            backgroundColor: isCheckWeekView == keyIndex ? colors.themeGreen : colors.MapDownColor,
            borderWidth: isCheckWeekView == keyIndex ? 0 : 1,

        }} onPress={() => {
            onPressWeek(data, keyIndex)
        }}>
            <Text style={{
                ...style.title, color: isCheckWeekView == keyIndex ? colors.white : colors.themeTextGrey,
            }}>{`Week ${keyIndex + 1}`}</Text>
        </TouchableOpacity>
    )
}

export default WeekDisplay

const style = StyleSheet.create({
    weekView: {
        width: Responsive.wp(16.2),
        backgroundColor: colors.themeGreen,
        borderRadius: Responsive.hp(3),
        borderWidth: 1,
        borderColor: colors.themeTextGrey,
        marginHorizontal: Responsive.hp(1),
        height:PlatformType.android ? Responsive.hp(4):Responsive.hp(3),
        justifyContent: 'center',
        elevation: 2,
        shadowOffset: { width: 0.2, height: 0.2 },
        shadowColor: colors.black,
        shadowRadius: 1,
        shadowOpacity: 0.1,
        marginLeft: 1,
    },
    title: { color: colors.themeTextGrey, ...GlobalStyle.Fonts_B_15, textAlign: 'center', fontSize: Responsive.hp(1.4) },
    styleSelectStyle: {
        borderWidth: 1,
        borderColor: colors.themeTextGrey
    }
})