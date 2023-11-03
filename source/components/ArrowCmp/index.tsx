import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { images } from '../../utils/images'
import colors from '../../utils/colors'
import Responsive from '../../utils/Responsive'
import PlatformType from '../../utils/PlatformType'

const ArrowCmp = ({ onPress, disabled, index, arrowImg }: any) => {

    return (
        <TouchableOpacity style={style.arrowView} onPress={() => onPress(index)} disabled={disabled}>
            <Image source={arrowImg} resizeMode='contain'
                style={style.arrowImg} tintColor={disabled ? colors.blackGrey30 : colors.black} />
        </TouchableOpacity>
    )
}

export default ArrowCmp

const style = StyleSheet.create({
    arrowView: { height: Responsive.hp(10) , },
    arrowImg: { 
        height:PlatformType.android ? Responsive.hp(3.5) : Responsive.hp(2.7), 
        width:PlatformType.android ?  Responsive.hp(3.5) :Responsive.hp(2.7)
     },
})