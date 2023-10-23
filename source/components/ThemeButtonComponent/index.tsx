import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Color from "../../utils/colors";
import { GlobalStyle } from "../../utils/GlobalStyle";
import Responsive from "../../utils/Responsive";
import { style } from "./style";

export const ThemeButtonComponent = ({
  title,
  buttonStyle,
  textStyle,
  onPress,
  isActive,
  checkInBtn
}: any) => {

  return (
    <>
      <TouchableOpacity
        style={{
          backgroundColor: checkInBtn === 0
            ? Color.deactive
            : checkInBtn === 1
              ? Color.themeGreen
              : checkInBtn === 2
                ? Color.timerColor
                : Color.deactive,
          // backgroundColor: isActive ? Color.themeGreen : Color.deactive,
          ...style.mainView,
          ...buttonStyle,
        }}
        activeOpacity={0.9}
        onPress={() => {
          onPress();
        }}
      >
        <Text
          style={{
            ...style.btnTitle,
            ...textStyle,
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </>
  );
};
