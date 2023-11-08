import React, { memo } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import colors from '../../utils/colors'
import Responsive from '../../utils/Responsive'
import { GlobalStyle } from '../../utils/GlobalStyle'
import PlatformType from '../../utils/PlatformType'

const BedListCmp = ({ listItem }: any) => {
    const { data, title } = listItem?.item;

    return (
        <View style={style.itemContainer}>
            <View style={{ ...style.itemUpContainer }}>
                <Text style={style.title}>{title}</Text>
                <View style={style.separatorLine} />
                {data != undefined &&
                    data.map((item: any) =>
                    (
                        <View style={style.row}>
                            <View style={style.imgContainer}>
                                <Image source={item?.img} style={style.image} />
                            </View>
                            <Text style={style.subTitle}>{item.name}</Text>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}
export default memo(BedListCmp)
const style = StyleSheet.create({
    itemContainer: {
        backgroundColor: colors.bedList,
        marginBottom: PlatformType.android ? Responsive.hp(2) : Responsive.hp(1), justifyContent: "space-between",
        alignItems: "center", marginHorizontal: Responsive.wp(1), borderRadius: Responsive.hp(1),
        shadowOffset: { width: 0.2, height: 0.2 },
        shadowColor: colors.black,
        shadowRadius: 1,
        shadowOpacity: 0.1,
        elevation: 3,
        marginTop: Responsive.hp(1.3),
    },
    itemUpContainer: {
        width: "100%",
        backgroundColor: colors.bedList,
        paddingVertical: Responsive.hp(0.3),
        borderRadius: Responsive.hp(1),

    },
    image: {
        width: PlatformType.android ? Responsive.hp(2.4) : Responsive.hp(2),
        height: PlatformType.android ? Responsive.hp(2.4) : Responsive.hp(2),
        resizeMode: 'contain'
    },
    title: {
        color: colors.themeTextBlack,
        ...GlobalStyle.Fonts_M_15,
        paddingBottom: Responsive.hp(1),
        marginTop: Responsive.hp(1),
        paddingHorizontal: Responsive.wp(2.5),
    },
    subTitle: {
        color: colors.themeTextBlack,
        ...GlobalStyle.Fonts_M_15,
        fontSize: Responsive.hp(1.5),
        textAlignVertical: 'center',
        marginLeft: Responsive.hp(1)
    },
    separatorLine: {
        backgroundColor: colors.bedSeparatorLine,
        height: 1.2, width: '100%', paddingHorizontal: 0,
        marginBottom: Responsive.hp(1.3),
    },
    imgContainer: {
        height: PlatformType.android ? Responsive.hp(4) : Responsive.hp(3.2),
        width: PlatformType.android ? Responsive.hp(4) : Responsive.hp(3.2),
        backgroundColor: colors.themeGrayLight50, borderRadius: Responsive.hp(1),
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        paddingBottom: Responsive.hp(1.2),
        flexDirection: 'row',
        paddingHorizontal: Responsive.wp(2.5), alignItems: 'center'
    },
    notes: {
        color: colors.themeTextBlack,
        ...GlobalStyle.Fonts_M_15,
        fontSize: Responsive.hp(1.5),
        paddingHorizontal: Responsive.hp(1),
        paddingBottom: Responsive.hp(1),
        // textAlignVertical: 'center',
        // marginLeft: Responsive.hp(1),

    }
})