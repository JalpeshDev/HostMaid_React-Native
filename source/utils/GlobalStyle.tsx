import { StyleSheet, Platform } from "react-native";
import Color from "./colors";
import Responsive from "./Responsive";
import Toast from "react-native-root-toast";
import Fonts from "./Fonts";

export const GlobalStyle = StyleSheet.create({
  containerSafeView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Color.white,
  },
  container: {
    flex: 1,
    width: Responsive.width,
    backgroundColor: Color.white,
    paddingHorizontal: Responsive.wp(6),
  },
  Fonts_B_35: { fontSize: Responsive.hp(4), fontFamily: Fonts.DMSans_B, fontWeight: "700" },
  Fonts_B_30: { fontSize: Responsive.hp(3.3), fontFamily: Fonts.DMSans_B, fontWeight: "700" },
  Fonts_B_16: { fontSize: Responsive.hp(1.9), fontFamily: Fonts.DMSans_B, fontWeight: "700" },
  Fonts_B_15: { fontSize: Responsive.hp(1.7), fontFamily: Fonts.DMSans_B, fontWeight: "700" },
  Fonts_M_15: { fontSize: Responsive.hp(1.7), fontFamily: Fonts.DMSans_M, fontWeight: "500" },
  Fonts_R_16: { fontSize: Responsive.hp(1.8), fontFamily: Fonts.DMSans_R, fontWeight: "400" },
  Fonts_R_14: { fontSize: Responsive.hp(1.6), fontFamily: Fonts.DMSans_R, fontWeight: "400" },
});

export const ToastStyle = {
  duration: Toast.durations.SHORT,
  position: Toast.positions.CENTER,
  shadow: true,
  animation: true,
  backgroundColor: Color.white,
  textColor: Color.black,
};
