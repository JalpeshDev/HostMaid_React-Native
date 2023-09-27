import { StyleSheet } from 'react-native';
import Responsive from '../../utils/Responsive';
import { GlobalStyle } from '../../utils/GlobalStyle';
import colors from '../../utils/colors';
export const style = StyleSheet.create({
    mainView: {
          borderRadius: Responsive.hp(1),
          height: Responsive.hp(6),
          justifyContent: "center",
          width: "100%",
    },
    btnTitle:{
        color: colors.white,
        ...GlobalStyle.Fonts_B_16,
        alignSelf: "center",
      },
});