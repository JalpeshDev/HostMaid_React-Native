import { StyleSheet, Platform } from "react-native";
import Color from "./colors";
import Responsive from "./Responsive";
import Toast, { ToastOptions } from "react-native-root-toast";
import Fonts from "./Fonts";
import colors from "./colors";
import PlatformType from "./PlatformType";

export const GlobalStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.MapDownColor
  },
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
  Fonts_M_14: { fontSize: Responsive.hp(1.4), fontFamily: Fonts.DMSans_M, fontWeight: "500" },
  Fonts_R_16: { fontSize: Responsive.hp(1.8), fontFamily: Fonts.DMSans_R, fontWeight: "400" },
  Fonts_R_14: { fontSize: Responsive.hp(1.6), fontFamily: Fonts.DMSans_R, fontWeight: "400" },
  bottomIconStyle: {
    height: PlatformType.android ? Responsive.hp(3) : Responsive.hp(2), width: PlatformType.android ? Responsive.hp(3) : Responsive.hp(2)
  }
});


export const ToastStyle: any = {
  duration: Toast.durations.SHORT,
  position: Toast.positions.BOTTOM,
  shadow: true,
  animation: true,
  backgroundColor: colors.white,
  textColor: colors.black,
};
export const ToastStyleThemeWhite: any = {
  duration: Toast.durations.SHORT,
  position: Toast.positions.BOTTOM,
  shadow: true,
  animation: true,
  backgroundColor: colors.black,
  textColor: colors.white,
};