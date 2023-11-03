import { Text, View, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GlobalStyle } from '../../../utils/GlobalStyle';
import { NavigationHeader } from '../../../components/AppThemeHeaderComponent/navigationHeader';
import { Strings } from '../../../utils/strings';
import PlatformType from '../../../utils/PlatformType';
import colors from '../../../utils/colors';
import { style } from '../Bath/style';
import { useAppSelector } from '../../../redux';

const Misc = () => {
    const { elapsed } = useAppSelector((state) => state.authReducer);
    return (
        <View style={GlobalStyle.mainContainer}>
            {PlatformType.android &&
                <StatusBar
                    animated
                    translucent={false}
                    backgroundColor={colors.themeGreen}
                />
            }
            <NavigationHeader isTitle={true} containerStyle={style.headerContainer}
                leftTitle={Strings.Misc} elapsedTime={elapsed} />
        </View>
    );
};

export default Misc;

