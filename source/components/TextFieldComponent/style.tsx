import { StyleSheet } from 'react-native';
import Responsive from '../../utils/Responsive';
import { GlobalStyle } from '../../utils/GlobalStyle';
import colors from '../../utils/colors';
export const styles = StyleSheet.create({
      mainView: {
            width: "100%", backgroundColor: colors.transparent,
      },
      btnTitle: {
            color: colors.white,
            ...GlobalStyle.Fonts_B_16,
            alignSelf: "center",
      },
      title: { textAlign: "left", ...GlobalStyle.Fonts_R_14, color: colors.white, width: "100%" },
      textInputFieldView: {
            width: "100%", backgroundColor: colors.white, marginTop: Responsive.hp(0.8), height: Responsive.hp(6),
            justifyContent: "flex-start", borderRadius: Responsive.hp(1), flexDirection: "row", alignItems: "center"
      },
      eyeBtnView: {
            width: Responsive.hp(5), height: Responsive.hp(5), position: "absolute", right: 0, justifyContent: "center", alignItems: "center"
      },
      rightTickIcon: {
            width: Responsive.hp(5), height: Responsive.hp(5), position: "absolute", right: 0, justifyContent: "center", alignItems: "center"
      },
      textInputStyle: { marginHorizontal: Responsive.wp(3), ...GlobalStyle.Fonts_R_16, width: "80%", color: colors.black }
});