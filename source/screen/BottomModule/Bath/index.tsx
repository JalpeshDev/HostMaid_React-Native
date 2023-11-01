import { FlatList, SafeAreaView, View } from 'react-native'
import React, { useEffect } from 'react'
import viewModel from './viewModel'
import { style } from './style'
import { BedListCmp } from '../../../components/ListCmp/BedListCmp'
import Responsive from '../../../utils/Responsive'
import { NavigationHeader } from '../../../components/AppThemeHeaderComponent/navigationHeader'
import { GlobalStyle } from '../../../utils/GlobalStyle'


const Bath = () => {
    const { DATA } = viewModel();

    const renderItem = (item: any) => {
        return (
            <BedListCmp listItem={item} />
        )
    }

    return (
        <SafeAreaView style={GlobalStyle.mainContainer}>
            <NavigationHeader isTitle={true} containerStyle={{ height: Responsive.hp(6) }} leftTitle={"Bed/Bath Summary"} />
            <View style={{ paddingTop: Responsive.hp(5) }}>
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




