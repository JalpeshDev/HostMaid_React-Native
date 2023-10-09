import React, { useEffect, useState } from 'react';

import viewModel from './viewModel'
import { Text, View, Image, ImageBackground, SafeAreaView, Dimensions } from 'react-native';
import { style } from './style';
import { images } from '../../../utils/images';
import Responsive from '../../../utils/Responsive';
import { TextFieldComponent } from '../../../components/TextFieldComponent';
import { ThemeButtonComponent } from '../../../components/ThemeButtonComponent';
import { emailvalidate } from '../../../utils/Validation';
import navigationServices from '../../../navigator/navigationServices';
import routes from '../../../navigator/routes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';
import Loader from '../../../components/Loader';

const Login = () => {
    // const { data, loading } = useSelector((state: any) => state.authReducer);
    const { onChange, visiblePassword, email, loginService, loading } = viewModel()

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
                                loginService()
                                // navigationServices.navigateToNext(routes.HomeScreen, {})
                            }}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Login
