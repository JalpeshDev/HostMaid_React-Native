
import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import colors from '../../utils/colors'
import { GlobalStyle } from '../../utils/GlobalStyle'
import Responsive from '../../utils/Responsive'
import icons from '../../utils/icons'

export const TextFieldComponent = ({ title, placeholder, onTextChange, style, isSecure, onPressSecure, visiblePassword, isValidation }: any) => {
    return (
        <View style={{ width: "100%", backgroundColor: colors.transparent, ...style }}>
            <Text style={{ textAlign: "left", ...GlobalStyle.Fonts_R_14, color: colors.white, width: "100%" }}>{title}</Text>
            <View style={{
                width: "100%", backgroundColor: colors.white, marginTop: Responsive.hp(0.8), height: Responsive.hp(6),
                justifyContent: "flex-start", borderRadius: Responsive.hp(1), flexDirection: "row", alignItems: "center"
            }}>
                <TextInput placeholder={placeholder} secureTextEntry={visiblePassword}
                    autoCapitalize='none'
                    style={{ marginHorizontal: Responsive.wp(3), ...GlobalStyle.Fonts_R_16, width: "80%" }}
                    onChangeText={(value) => {
                        onTextChange(value)
                    }}>
                </TextInput>
                {isSecure &&
                    <TouchableOpacity activeOpacity={0.9} style={{
                        width: Responsive.hp(5), height: Responsive.hp(5), position: "absolute", right: 0, justifyContent: "center", alignItems: "center"
                    }}
                        onPress={() => {
                            onPressSecure()
                        }}
                    >
                        {!visiblePassword ? icons.eyeIcon : icons.eyeOffIcon}
                    </TouchableOpacity>
                }
                {isValidation &&
                    <View style={{
                        width: Responsive.hp(5), height: Responsive.hp(5), position: "absolute", right: 0, justifyContent: "center", alignItems: "center"
                    }}
                    >
                        {icons.rightTickIcon}
                    </View>
                }
            </View>
        </View>
    )
}
