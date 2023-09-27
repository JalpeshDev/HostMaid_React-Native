import { Text, SafeAreaView, View, StyleSheet, Image, ImageBackground } from 'react-native';
import React, { useEffect } from 'react';
import navigationServices from '../../../navigator/navigationServices';
import routes from '../../../navigator/routes';
import { style } from './style';
import { images } from '../../../utils/images';

const Splash = () => {
    const nextScreen = async () => {
        navigationServices.navigateToNext(routes.Welcome, {});
    };

    useEffect(() => {
        setTimeout(() => {
            nextScreen();
        }, 2000);
    }, []);

    return (
        <View
            style={style.mainView}>
            <ImageBackground source={images.backgroundSpalsh} resizeMode="contain" style={style.imageBGContainer}>
                <Image source={images.appLogo} style={style.imageLogoContainer} resizeMode='contain' />
            </ImageBackground>
        </View>
    );
};

export default Splash;
