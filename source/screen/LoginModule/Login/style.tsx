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
    imageBGContainer: { width: "100%", height: "100%", justifyContent: "flex-start" },
    imageLogoContainer: { width: Responsive.wp(76), height: Responsive.hp(6), alignSelf: "center", marginTop: Responsive.hp(20) },
    containContainer: {
        width: "100%", height: Responsive.hp(60), marginBottom: 0,
        paddingHorizontal: Responsive.wp(9), backgroundColor: colors.themeBlack, borderTopLeftRadius: Responsive.hp(3),
        borderTopRightRadius: Responsive.hp(3),
        justifyContent: 'flex-start', alignItems:"center",
    },
    loginTitleContainer:{ textAlign: "left", marginTop: Responsive.hp(6), ...GlobalStyle.Fonts_B_30, color: colors.themeGray, width: "100%" },
    btnContainer:{width:Responsive.wp(10), backgroundColor:colors.white, borderRadius: Responsive.hp(1), height: Responsive.hp(0.8), marginTop: Responsive.hp(0.8)},
});

