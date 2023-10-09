
import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import colors from '../../utils/colors'
import { GlobalStyle } from '../../utils/GlobalStyle'
import Responsive from '../../utils/Responsive'
import icons from '../../utils/icons'
import { styles } from './style'

export const TextFieldComponent = ({ title, placeholder, onTextChange, style, isSecure, onPressSecure, visiblePassword, isValidation }: any) => {
    return (
        <View style={{ ...styles.mainView, ...style }}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.textInputFieldView}>
                <TextInput placeholder={placeholder} secureTextEntry={visiblePassword}
                    placeholderTextColor={colors.black}
                    autoCapitalize='none'
                    style={{ marginHorizontal: Responsive.wp(3), ...GlobalStyle.Fonts_R_16, width: "80%" }}
                    onChangeText={(value) => {
                        onTextChange(value)
                    }}>

                </TextInput>
                {isSecure &&
                    <TouchableOpacity activeOpacity={0.9} style={styles.eyeBtnView}
                        onPress={() => {
                            onPressSecure()
                        }}
                    >
                        {!visiblePassword ? icons.eyeIcon : icons.eyeOffIcon}
                    </TouchableOpacity>
                }
                {isValidation &&
                    <View style={styles.rightTickIcon}
                    >
                        {icons.rightTickIcon}
                    </View>
                }
            </View>
        </View>
    )
}
