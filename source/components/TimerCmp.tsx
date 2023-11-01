import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Responsive from '../utils/Responsive'
import colors from '../utils/colors'
import { GlobalStyle } from '../utils/GlobalStyle'
import { formatTime, timeFormate, trackerTime } from '../utils/generalFunction'

const TimerCmp = ({ mainTimerStyle, timetitleStyle, elapsedTime }: any) => {
    return (
        <TouchableOpacity style={{
            ...style.main, ...mainTimerStyle,

        }} onPress={() => {

        }}>
            <Text style={{
                ...style.title, ...timetitleStyle
            }}>
                {trackerTime(elapsedTime)}
            </Text>
        </TouchableOpacity>
    )
}

export default TimerCmp


const style = StyleSheet.create({
    main: {
        width: Responsive.wp(35),
        backgroundColor: colors.MapDownColor,
        borderRadius: Responsive.hp(3),
        borderWidth: 0.61,
        borderColor: colors.timerbackground,
        height: Responsive.hp(5),
        justifyContent: 'center',
        elevation: 1,
        shadowOffset: { width: 0.2, height: 0.2 },
        shadowColor: colors.black,
        shadowRadius: 1,
        shadowOpacity: 0.1,
    },
    title: {
        color: colors.timerColor, ...GlobalStyle.Fonts_B_16,
        textAlign: 'center', fontSize: Responsive.hp(2)
    },
    styleSelectStyle: {
        borderWidth: 1,
        borderColor: colors.themeTextGrey
    }
})