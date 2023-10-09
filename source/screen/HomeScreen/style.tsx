import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import Responsive from '../../utils/Responsive';
import { GlobalStyle } from '../../utils/GlobalStyle';

export const style = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: colors.MapDownColor
    },
    imgStyle: { width: Responsive.wp(5), height: Responsive.hp(3.2), },
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
    },
    listInContainer: {
        borderRadius: Responsive.hp(2), paddingTop: Responsive.hp(1),
    },
    weekMainView: { width: '100%', alignItems: 'center', },
    inWeekContainer: { width: '91%', },
    rowContainer: {
        flexDirection: 'row', width: '100%', paddingVertical: Responsive.hp(2),
    },
    paddingBottom: { paddingBottom: Responsive.hp(3.2), },
    weekView: {
        width: "18%", backgroundColor: colors.themeGreen, borderRadius: Responsive.hp(2),
        paddingVertical: Responsive.hp(1.5),
        height: Responsive.hp(9),
        justifyContent: 'center',
        borderWidth: 0.86,
        borderColor: colors.themeSubFontGray,
        // elevation: 1
    },
    dataNot: {
        justifyContent: 'center', alignItems: 'center',
        borderRadius: Responsive.hp(1),
        flex: 1,
        paddingBottom: Responsive.hp(5)
    },
    dataNotImg: {
        height: Responsive.hp(15),
        width: Responsive.hp(15),
    },
    dataNotText: {
        ...GlobalStyle.Fonts_B_15,
        fontSize: Responsive.hp(1.8),
        paddingTop: Responsive.hp(2),
        color: colors.themeTextBlack

    }
});