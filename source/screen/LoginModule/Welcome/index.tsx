import { Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { style } from './style';
import { images } from '../../../utils/images';
import icons from '../../../utils/icons';
import navigationServices from '../../../navigator/navigationServices';
import routes from '../../../navigator/routes';

const Welcome = () => {
    const [isVisible, setVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setVisible(true)
        }, 1000);
    }, []);

    return (
        <View
            style={style.mainView}>
            <ImageBackground source={images.backgroundSpalsh} resizeMode="contain" style={style.imageBGContainer}>
                <Image source={images.appLogo} style={style.imageLogoContainer} resizeMode='contain' />
                {isVisible &&
                    <View style={style.containContainer}>
                        <Text style={style.textTitle}>Get Started</Text>
                        <Text style={style.textSubTitle}>Login now to manage your <Text style={style.textSubHighlight}>work schedules.</Text></Text>
                        <TouchableOpacity style={style.btnContainer} onPress={()=>{
                            navigationServices.navigateToNext(routes.Login, {});
                        }}>
                            {icons.nextIcon}
                        </TouchableOpacity>
                    </View>
                }
            </ImageBackground>
        </View>
    );
};

export default Welcome;
