import { View, StatusBar, Image, ImageBackground } from 'react-native';
import React, { useEffect } from 'react';
import navigationServices from '../../../navigator/navigationServices';
import routes from '../../../navigator/routes';
import { style } from './style';
import { images } from '../../../utils/images';
import { localStorage } from '../../../utils/localStorageProvider';
import { LocalStorageKey } from '../../../utils/strings';
import PlatformType from '../../../utils/PlatformType';
import colors from '../../../utils/colors';

const Splash = () => {
    const nextScreen = async () => {
        let isLoggedIn = await localStorage.getItemObject(LocalStorageKey.isLoggedIn)
        if (isLoggedIn) {
            navigationServices.navigateToNext(routes.HomeScreen, {});
        } else {
            navigationServices.navigateToNext(routes.Welcome, {});
        }
    };

    useEffect(() => {
        setTimeout(() => {
            nextScreen();
        }, 2000);
    }, []);

    return (
        <View
            style={style.mainView}>
            {PlatformType.android &&
                <StatusBar
                    animated
                    translucent={false}
                    backgroundColor={colors.black}
                />
            }
            <ImageBackground source={images.backgroundSpalsh} resizeMode="cover" style={style.imageBGContainer}>
                <Image source={images.appLogo} style={style.imageLogoContainer} resizeMode='contain' />
            </ImageBackground>
        </View>
    );
};

export default Splash;
