import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors';
import Responsive from '../../../utils/Responsive';
import { GlobalStyle } from '../../../utils/GlobalStyle';
export const style = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageBGContainer: { width: "100%", height: "100%", justifyContent: "center" },
    imageLogoContainer: { width: Responsive.wp(76), height: Responsive.hp(6), alignSelf: "center" },
    containContainer: { width: "100%", height: "40%", position: "absolute", bottom: 0, justifyContent: "center", alignItems: "center", paddingHorizontal: Responsive.wp(15) },
    textTitle: { ...GlobalStyle.Fonts_B_35, color: colors.white },
    textSubTitle: { ...GlobalStyle.Fonts_M_15, color: colors.themeGray, marginTop: Responsive.hp(2), textAlign: "center" },
    textSubHighlight: { ...GlobalStyle.Fonts_B_15, color: colors.themeGreen },
    btnContainer: { width: Responsive.hp(6), height: Responsive.hp(6), backgroundColor: colors.themeGreen, borderRadius: Responsive.hp(3), alignSelf: "center", marginTop: Responsive.hp(6), alignItems: "center", justifyContent: "center" },
});

