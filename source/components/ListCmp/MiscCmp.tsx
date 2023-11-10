import React, { memo } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import colors from '../../utils/colors'
import Responsive from '../../utils/Responsive'
import { GlobalStyle } from '../../utils/GlobalStyle'
import PlatformType from '../../utils/PlatformType'

const MiscCmp = ({ item }: any) => {
    const { data, title } = item?.item;

    return (
        <View style={style.itemContainer}>
            <View style={{ ...style.itemUpContainer }}>
                {title && <Text style={style.title}>{title}</Text>}
                {data &&
                    <Text style={style.data}>{data}</Text>
                }
            </View>
        </View>
    )
}
export default memo(MiscCmp)

const style = StyleSheet.create({
    itemContainer: {
        backgroundColor: colors.bedList,
        marginHorizontal: Responsive.wp(1),
        borderRadius: Responsive.hp(1),
        shadowOffset: { width: 0.2, height: 0.2 },
        shadowColor: colors.black,
        shadowRadius: 1,
        shadowOpacity: 0.1,
        elevation: 3,
        margin: Responsive.hp(1.6),
        paddingHorizontal: Responsive.hp(1.5),
    },
    itemUpContainer: {
        width: "100%",
        backgroundColor: colors.bedList,
        paddingVertical: Responsive.hp(0.3),
        borderRadius: Responsive.hp(1),
    },
    title: {
        color: colors.themeFontBlack,
        ...GlobalStyle.Fonts_B_16,
        paddingVertical: Responsive.hp(1.5)

    },
    data: {
        color: colors.themeBlueGray,
        ...GlobalStyle.Fonts_M_14,
        paddingBottom: Responsive.hp(1.5)
    }
})