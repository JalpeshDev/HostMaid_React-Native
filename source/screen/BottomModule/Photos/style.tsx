import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors';
import Responsive from '../../../utils/Responsive';
import { GlobalStyle } from '../../../utils/GlobalStyle';
import PlatformType from '../../../utils/PlatformType';

export const style = StyleSheet.create({
    headerContainer: {
        backgroundColor: colors.themeGreen,
        top: 0,
        position: 'relative',
        alignItems: "flex-end"
    },
    listContainer: {
        width: "92%",
        alignSelf: "center",
    },
    listInContainer: {
        borderRadius: Responsive.hp(2), paddingTop: Responsive.hp(1),
    },
    flatlistContainer: { height: Responsive.hp(56), marginTop: Responsive.hp(3), },
    boxStyle: {
        height: Responsive.hp(35),
        marginTop: Responsive.hp(6),
        width: Responsive.hp(35), alignSelf: 'center',
        borderColor: colors.themeTextBlack,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderRadius: Responsive.hp(2),
        justifyContent: 'center', alignItems: 'center'
    },
    btn: {
        width: "40%",
        borderRadius: Responsive.hp(5),
        height: Responsive.hp(6.5),
        alignSelf: 'center',
        marginBottom: Responsive.hp(1),
        backgroundColor: colors.themeTextBlack10,
        shadowOffset: { width: 0.2, height: 0.2 },
        shadowColor: colors.themeTextBlack10,
        shadowRadius: 1,
        shadowOpacity: 0.1,
        elevation: 4
    },
    btnTitle: {
        ...GlobalStyle.Fonts_B_15,
        fontSize: PlatformType.android ? Responsive.hp(1.9) : Responsive.hp(1.5),
    },
    uploadText: {
        ...GlobalStyle.Fonts_M_15,
        fontSize: Responsive.hp(1.8),
        color: colors.themeTextBlack,
        marginHorizontal: Responsive.hp(2),
        textAlign: 'center'
    },
    addPhotos: { position: 'absolute', bottom: 0, alignSelf: 'center', },
    addPhotosBtn: {
        width: "100%",
        borderRadius: Responsive.hp(5),
        height: Responsive.hp(6),
        marginBottom: Responsive.hp(1),
        backgroundColor: colors.themeTextBlack,
        shadowOffset: { width: 0.2, height: 0.2 },
        shadowColor: colors.themeTextBlack,
        shadowRadius: 1,
        shadowOpacity: 0.1,
        elevation: 4,
        paddingHorizontal: Responsive.hp(2),
    },
});

