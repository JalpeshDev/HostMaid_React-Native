import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import Responsive from '../../utils/Responsive'
import { images } from '../../utils/images'
import colors from '../../utils/colors'
import Entypo from "react-native-vector-icons/Entypo";

const DisplayImageList = ({ item, onLongPressToDelete, onDeletePress, onFullViewerImg }: any) => {
    const isLastItemInRow = (item?.index + 1) % 3 === 1;

    return (
        <TouchableOpacity activeOpacity={0.9} onPress={() => { onFullViewerImg(item) }} onLongPress={() => { onLongPressToDelete(item) }} style={style.imageContainer}>
            <Image source={{ uri: item?.item?.path }} style={[style.container, isLastItemInRow && style.noMargin]} />
            {/* <Image source={images.Home1} style={[style.container, isLastItemInRow && style.noMargin]} /> */}

            {item?.item?.isDelete &&
                <TouchableOpacity style={style.crossIconContainer} onPress={() => { onDeletePress(item) }}>
                    <Entypo name="cross" size={Responsive.hp(2)} color={colors.white} />
                </TouchableOpacity>
            }
        </TouchableOpacity>
    )
}

export default memo(DisplayImageList)

const style = StyleSheet.create({
    container: {
        borderRadius: Responsive.hp(1),
        margin: Responsive.hp(1),
        resizeMode: 'contain',
        height: Responsive.wp(27.8),
        width: Responsive.wp(27.8)
        // height: Responsive.hp(14),
        // width: Responsive.wp(28),

    },
    imageContainer: {
        shadowColor: colors.black,
        shadowOffset: { width: 0.2, height: 0.2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },
    noMargin: {
        marginLeft: 0,
    },
    crossImage: {
        width: Responsive.hp(2),
        height: Responsive.hp(2),
        resizeMode: 'contain',
    },
    crossIconContainer: {
        height: Responsive.hp(2.5),
        width: Responsive.hp(2.5),
        backgroundColor: colors.themeTextBlack,
        borderRadius: Responsive.hp(2),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 100,
    }
})