import { FlatList, SafeAreaView, View, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import viewModel from './viewModel'
import { style } from './style'
import BedListCmp from '../../../components/ListCmp/BedListCmp'
import Responsive from '../../../utils/Responsive'
import { NavigationHeader } from '../../../components/AppThemeHeaderComponent/navigationHeader'
import { GlobalStyle } from '../../../utils/GlobalStyle'
import { Strings } from '../../../utils/strings'
import { useAppSelector } from '../../../redux'
import colors from '../../../utils/colors'
import PlatformType from '../../../utils/PlatformType'


const Bath = () => {
    const { DATA } = viewModel();
    const { elapsed } = useAppSelector((state) => state.authReducer);
    const renderItem = (item: any) => {
        return (
            <BedListCmp listItem={item} />
        )
    }

    return (
        <SafeAreaView style={GlobalStyle.mainContainer}>
            {PlatformType.android &&
                <StatusBar
                    animated
                    translucent={false}
                    backgroundColor={colors.themeGreen}
                />
            }
            <NavigationHeader isTitle={true} containerStyle={style.headerContainer}
                leftTitle={Strings.BedBath} elapsedTime={elapsed} />
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
        </SafeAreaView>
    )
}

export default Bath




