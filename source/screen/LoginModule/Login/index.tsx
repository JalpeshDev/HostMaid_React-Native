import React, { useEffect, useState } from 'react';
import viewModel from './viewModel'
import { Text, View, Image, ImageBackground, SafeAreaView, Platform, } from 'react-native';
import { style } from './style';
import { images } from '../../../utils/images';
import Responsive from '../../../utils/Responsive';
import { TextFieldComponent } from '../../../components/TextFieldComponent';
import { ThemeButtonComponent } from '../../../components/ThemeButtonComponent';
import { emailvalidate } from '../../../utils/Validation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loader from '../../../components/Loader';
import { Strings } from '../../../utils/strings';

const Login = () => {
    const { onChange, visiblePassword, email, loginService, loading } = viewModel()
    const keyboardBehavior = Platform.OS == 'ios' ? 'padding' : 'height'

    return (
        <SafeAreaView
            style={style.mainView}>
            <ImageBackground source={images.backgroundSpalsh} resizeMode="cover" style={style.imageBGContainer}>
                <KeyboardAwareScrollView>
                    <View style={style.headerView}>
                        <Image source={images.appLogo} style={{ ...style.imageLogoContainer, }} resizeMode='contain' />
                    </View>
                    <Loader loading={loading} />
                    <View style={{ ...style.containContainer, }}>
                        <View style={style.btnContainer} />
                        <Text style={style.loginTitleContainer}>Log in</Text>
                        <TextFieldComponent
                            title={Strings.EmailAddress}
                            placeholder={Strings.EmailAddress}
                            style={{ marginTop: Responsive.hp(4) }}
                            onTextChange={(value: any) => {
                                onChange(value, "email")
                            }}
                            isValidation={emailvalidate(email.trim())}
                        />
                        <TextFieldComponent
                            title={Strings.Password}
                            placeholder={Strings.Password}
                            style={{ marginTop: Responsive.hp(3) }}
                            onTextChange={(value: any) => {
                                onChange(value, "password")
                            }}
                            isSecure={true}
                            visiblePassword={visiblePassword}
                            onPressSecure={() => {
                                onChange(!visiblePassword, "visiblePassword")
                            }}
                        />
                        <ThemeButtonComponent
                            title={Strings.Login}
                            isActive={true}
                            buttonStyle={{ marginTop: Responsive.hp(5) }}
                            onPress={() => {
                                loginService()
                            }}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Login

