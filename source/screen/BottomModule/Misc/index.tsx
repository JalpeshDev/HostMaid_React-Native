<<<<<<< HEAD
import { Text, View, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
=======
import { Text, View, StatusBar, FlatList } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
>>>>>>> Development
import { GlobalStyle } from '../../../utils/GlobalStyle';
import { NavigationHeader } from '../../../components/AppThemeHeaderComponent/navigationHeader';
import { Strings } from '../../../utils/strings';
import PlatformType from '../../../utils/PlatformType';
import colors from '../../../utils/colors';
import { style } from '../Bath/style';
import { useAppSelector } from '../../../redux';
<<<<<<< HEAD

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

=======
import viewModel from './viewModel';
import MiscCmp from '../../../components/ListCmp/MiscCmp';

const Misc = () => {
    const { elapsed } = useAppSelector((state) => state.authReducer);
    const { DATA } = viewModel();


    const renderItem = useCallback(
        (item: any) => {
            return <MiscCmp item={item} />;
        },
        []
    )

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
            <View style={{}}>
                <FlatList
                    numColumns={1}
                    data={DATA}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={style.listInContainer}
                    style={style.listContainer}
                />
            </View>
        </View>
    );
};

>>>>>>> Development
export default Misc;

