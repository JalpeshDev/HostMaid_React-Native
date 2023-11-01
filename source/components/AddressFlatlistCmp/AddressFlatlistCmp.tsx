import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import colors from '../../utils/colors'
import Responsive from '../../utils/Responsive'
import { GlobalStyle } from '../../utils/GlobalStyle'
import { images } from '../../utils/images'
import { localStorage } from '../../utils/localStorageProvider'
import { useIsFocused } from '@react-navigation/native';

export const AddressFlatlistCmp = ({ item, onArrowPress, property_id }: any) => {
    const [state, setState] = useState(false)
    useEffect(() => {
        const loadElapsedTime = async () => {
            try {
                const savedTimeData = await localStorage.getItemObject(`property_id${property_id}`)
                if (savedTimeData) {
                    setState(true)
                } else { setState(false) }
            } catch (error) {
                console.error('Error loading elapsed time: ', error);
            }
        };

        loadElapsedTime();
    }, [property_id, item]);

    const dateTime = new Date(item.item.cleaning_date);
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    const timeString = `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${amOrPm}`;


    return (
        <View style={style.itemContainer}>
            <View style={{ ...style.itemUpContainer, backgroundColor: state ? colors.themeGreen20 : colors.themeSubFontGray }}>
                <View style={style.firstView}>
                    <View style={style.flexView}>
                        <Text numberOfLines={2} style={style.firstTextList}>{`${item.item.property_name}`}</Text>
                    </View>
                    <View style={{ ...style.flexView, width: "90%", }}>
                        <Text numberOfLines={1} style={style.secondTextList}>{`${item.item.property_address1}`}</Text>
                        <Text style={style.timeStyle}>{timeString}</Text>
                    </View>
                </View>
                <View style={style.secondView}>
                    <TouchableOpacity style={style.imageView} onPress={onArrowPress} >
                        <Image source={images.forward} style={style.image} resizeMode='contain' />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    itemContainer: {
        backgroundColor: colors.white,
        marginBottom: Responsive.hp(2), justifyContent: "space-between",
        alignItems: "center", marginHorizontal: Responsive.wp(1), borderRadius: Responsive.hp(1),
        shadowOffset: { width: 0.2, height: 0.2 },
        shadowColor: colors.black,
        shadowRadius: 1,
        shadowOpacity: 0.1,
        elevation: 5,
        marginTop: Responsive.hp(1.3),
    },
    itemUpContainer: {
        width: "100%",
        backgroundColor: colors.themeSubFontGray,
        flexDirection: "row", justifyContent: "space-between",
        alignItems: "center", paddingHorizontal: Responsive.wp(2),
        paddingVertical: Responsive.hp(2), borderRadius: Responsive.hp(1),
    },
    firstTextList: {
        marginHorizontal: Responsive.wp(1), ...GlobalStyle.Fonts_B_16,
        color: colors.themeFontBlack, flex: 1, marginBottom: Responsive.hp(0.6),
    },
    secondTextList: {
        marginHorizontal: Responsive.wp(1), ...GlobalStyle.Fonts_R_14,
        color: colors.themeBlueGray, flex: 1,
        fontSize: Responsive.hp(1.5),
    },
    imageView: {
        backgroundColor: colors.white,
        borderRadius: Responsive.hp(1),
        width: Responsive.hp(5),
        height: Responsive.hp(5),
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowOffset: { width: 0.2, height: 0.2 },
        shadowColor: colors.black,
        shadowRadius: 1,
        shadowOpacity: 0.1,
    },
    image: {
        width: Responsive.hp(3.2),
        height: Responsive.hp(1.5),
    },
    flexView: {
        flexDirection: 'row',
    },
    firstView: {
        width: "80%",
    },
    secondView: {
        width: "20%"
    },
    timeStyle: {
        ...GlobalStyle.Fonts_M_15,
        fontSize: Responsive.hp(1.2),
        backgroundColor: colors.themeGreen,
        borderRadius: Responsive.hp(1),
        paddingVertical: Responsive.hp(0.4),
        paddingHorizontal: Responsive.hp(1),
        color: colors.white,
        elevation: 1
    }
})