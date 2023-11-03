import { StyleSheet, Text, View, StatusBar, FlatList } from 'react-native'
import React from 'react'
import { GlobalStyle } from '../../../utils/GlobalStyle'
import PlatformType from '../../../utils/PlatformType';
import { useAppSelector } from '../../../redux';
import colors from '../../../utils/colors';
import { style } from '../Bath/style';
import { Strings } from '../../../utils/strings';
import { NavigationHeader } from '../../../components/AppThemeHeaderComponent/navigationHeader';
import BedListCmp from '../../../components/ListCmp/BedListCmp';
import viewModel from './viewModel';

const Photos = () => {
    const { elapsed } = useAppSelector((state) => state.authReducer);
    const { DATA } = viewModel();
    const renderItem = (item: any) => {
        return (
            <BedListCmp listItem={item} />
        )
    }
    return (
        <View style={GlobalStyle.mainContainer}>
            {PlatformType.android &&
                <StatusBar
                    animated
                    translucent={false}
                    backgroundColor={colors.themeGreen}
                />
            }
            <NavigationHeader
                isTitle={true}
                containerStyle={style.headerContainer}
                leftTitle={Strings.NotesPhotos}
                elapsedTime={elapsed}
            />
            {/* <View style={{}}>
                <FlatList
                    numColumns={1}
                    data={DATA}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={style.listInContainer}
                    style={style.listContainer}
                />
            </View> */}
        </View>
    );
}

export default Photos

