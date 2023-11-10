import React from 'react'
import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import colors from '../../utils/colors'
import Responsive from '../../utils/Responsive'
import { GlobalStyle } from '../../utils/GlobalStyle'
import PlatformType from '../../utils/PlatformType'
import { ThemeButtonComponent } from '../ThemeButtonComponent'
import { images } from '../../utils/images'
import { Strings } from '../../utils/strings'

const NotesListCmp = ({ title, notes, onTextChange, isBtnEnable,
    onEditPress, isEditBtnVisiable, onSavePress }: any) => {

    return (
        <View style={style.itemContainer}>
            <View style={{ ...style.itemUpContainer }}>
                <View style={style.row}>
                    <Text style={{ ...style.title, marginBottom: !isEditBtnVisiable ? Responsive.hp(1.5) : 0 }}>{title}</Text>
                    {isEditBtnVisiable &&
                        <TouchableOpacity onPress={onEditPress} style={{ padding: Responsive.hp(1) }}>
                            <Image source={images.Edit} style={style.image} />
                        </TouchableOpacity>
                    }
                </View>
                <View style={style.separatorLine} />
                {!isEditBtnVisiable ?
                    <TextInput
                        placeholder={Strings.NotesPlaceholder}
                        placeholderTextColor={colors.black}
                        autoCapitalize='none'
                        style={{ ...style.textInputStyle }}
                        onChangeText={onTextChange}
                        multiline={true}
                        value={notes}
                    />
                    :
                    <ScrollView style={style.scrollContainer}>
                        <Text style={style.notes}>{notes}</Text>
                    </ScrollView>
                }
                {!isEditBtnVisiable &&
                    <ThemeButtonComponent title={Strings.Save}
                        buttonStyle={{
                            ...style.btn,
                            backgroundColor: isBtnEnable ? colors.themeTextBlack : colors.disable
                        }}
                        textStyle={{ ...style.btnTitle, }}
                        onPress={onSavePress}
                        disabled={!isBtnEnable}
                    />
                }

            </View>
        </View>
    )
}
export default NotesListCmp
const style = StyleSheet.create({
    itemContainer: {
        alignItems: "center",
        marginTop: Responsive.hp(3),
        width: '100%',
    },
    itemUpContainer: {
        width: "92%",
        backgroundColor: colors.bedList,
        paddingVertical: Responsive.hp(0.3),
        borderRadius: Responsive.hp(1),
        shadowOffset: { width: 0.2, height: 0.2 },
        shadowColor: colors.black,
        shadowRadius: 1,
        shadowOpacity: 0.1,
        elevation: 3,
    },
    image: {
        width: PlatformType.android ? Responsive.hp(2.4) : Responsive.hp(2),
        height: PlatformType.android ? Responsive.hp(2.4) : Responsive.hp(2),
        resizeMode: 'contain',
    },
    title: {
        color: colors.themeTextBlack,
        ...GlobalStyle.Fonts_M_15,
        paddingTop: Responsive.hp(1),
        marginLeft: Responsive.hp(1.5),
    },
    separatorLine: {
        backgroundColor: colors.bedSeparatorLine,
        height: 1.2, width: '100%', paddingHorizontal: 0,
        // marginBottom: Responsive.hp(1.3),
    },
    notes: {
        color: colors.themeTextBlack,
        ...GlobalStyle.Fonts_M_15,
        margin: Responsive.hp(1.5),
    },
    textInputStyle: {
        marginHorizontal: Responsive.wp(2.5),
        ...GlobalStyle.Fonts_M_15,
        color: colors.black,
        minHeight: Responsive.hp(6),
        maxHeight: Responsive.hp(15),
        paddingTop: Responsive.hp(1.5),
    },
    btn: {
        width: "20%",
        borderRadius: Responsive.hp(5),
        height: Responsive.hp(4),
        alignSelf: 'center',
        marginBottom: Responsive.hp(1.4),
    },
    btnTitle: {
        ...GlobalStyle.Fonts_B_15,
        fontSize: PlatformType.android ? Responsive.hp(1.9) : Responsive.hp(1.5)
    },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    scrollContainer: {
        maxHeight: Responsive.hp(20.5),

    }
})