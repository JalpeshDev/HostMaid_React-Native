import React from "react";
import { Text, TouchableOpacity, Image, View } from "react-native";
import { style } from "./style";
import colors from "../../utils/colors";
import Responsive from "../../utils/Responsive";

export const ThemeButtonComponent = ({
  title,
  buttonStyle,
  textStyle,
  onPress,
  isActive,
  checkInBtn,
  isImage,
  disabled
}: any) => {

  return (
    <>
      <TouchableOpacity
        style={{
          backgroundColor: checkInBtn === 0
            ? colors.deactive
            : checkInBtn === 1
              ? colors.themeGreen
              : checkInBtn === 2
                ? colors.timerColor
                : colors.deactive,
          ...style.mainView,
          ...buttonStyle,
        }}
        activeOpacity={0.7}
        onPress={() => {
          onPress();
        }}
        disabled={disabled}
      >
        {isImage ?
          <View style={style.row}>
            <Image source={isImage} style={{
              ...style.image,
              width: title ? Responsive.hp(2.5) : Responsive.hp(3),
              height: title ? Responsive.hp(2.5) : Responsive.hp(3),
            }}
              tintColor={title ? colors.white : colors.themeTextBlack}
            />
            {title && <Text
              style={{
                ...style.btnTitle,
                ...textStyle,
                marginLeft: 10
              }}
            >
              {title}
            </Text>}
          </View>
          :
          <Text
            style={{
              ...style.btnTitle,
              ...textStyle,
            }}
          >
            {title}
          </Text>

        }
      </TouchableOpacity>
    </>
  );
};
