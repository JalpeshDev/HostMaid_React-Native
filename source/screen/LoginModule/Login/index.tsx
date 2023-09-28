import React, { useEffect, useState } from 'react';

import viewModel from './viewModel'
import { Text, View, Image, ImageBackground } from 'react-native';
import { style } from './style';
import { images } from '../../../utils/images';
import Responsive from '../../../utils/Responsive';
import { TextFieldComponent } from '../../../components/TextFieldComponent';
import { ThemeButtonComponent } from '../../../components/ThemeButtonComponent';
import { emailvalidate } from '../../../utils/Validation';
import navigationServices from '../../../navigator/navigationServices';
import routes from '../../../navigator/routes';

const Login = () => {
    const { onChange, visiblePassword, email } = viewModel()

    return (
        <View
            style={style.mainView}>
            <ImageBackground source={images.backgroundSpalsh} resizeMode="cover" style={style.imageBGContainer}>
                <Image source={images.appLogo} style={style.imageLogoContainer} resizeMode='contain' />
                <View style={{ flex: 1 }} />
                <View style={style.containContainer}>
                    <View style={style.btnContainer} />
                    <Text style={style.loginTitleContainer}>Log in</Text>
                    <TextFieldComponent
                        title={"Email address"}
                        placeholder={"Email address"}
                        style={{ marginTop: Responsive.hp(4) }}
                        onTextChange={(value: any) => {
                            onChange(value, "email")
                        }}
                        isValidation={emailvalidate(email.trim())}
                    />
                    <TextFieldComponent
                        title={"Password"}
                        placeholder={"Password"}
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
                        title={"Login"}
                        isActive={true}
                        buttonStyle={{ marginTop: Responsive.hp(5) }}
                        onPress={() => {
                            navigationServices.navigateToNext(routes.CheckInUnavaibleMap, {})
                        }}
                    />
                </View>

            </ImageBackground>
        </View>
    )
}

export default Login
