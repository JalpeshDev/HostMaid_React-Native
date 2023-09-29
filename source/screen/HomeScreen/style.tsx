import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import Responsive from '../../utils/Responsive';
import { GlobalStyle } from '../../utils/GlobalStyle';

export const style = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: colors.MapDownColor
    },
    imgStyle: { width: Responsive.wp(6), height: Responsive.hp(4), },
    flatlistHeader: {
        color: colors.themeTextBlack,
        ...GlobalStyle.Fonts_B_16,
        width: "90%"
    },
    flatlistHeaderView: {
        width: '100%',
        alignItems: 'center'
    },
    listContainer: {
        width: "92%",
        alignSelf: "center",
        marginTop: Responsive.hp(1),
        marginBottom: Responsive.hp(0.5),
        // backgroundColor: colors.themeSubFontGray
    },
    listInContainer: {
        borderRadius: Responsive.hp(2), paddingTop: Responsive.hp(1),
    },
});