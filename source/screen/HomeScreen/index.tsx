import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppThemeHeaderComponent } from '../../components/AppThemeHeaderComponent'
import { images } from '../../utils/images'
import { style } from './style'
import { AddressFlatlistCmp } from '../../components/AddressFlatlistCmp/AddressFlatlistCmp'

const HomeScreen = () => {
    const arryList = [
        {
            text1: "1340 Reynolds Ave #116-1097",
            text2: "Irvine, CA 92614 United States"
        },
        {
            text1: "1340 Reynolds Ave #116-1097",
            text2: "Irvine, CA 92614 United States"
        },
        {
            text1: "1340 Reynolds Ave #116-1097",
            text2: "Irvine, CA 92614 United States"
        },
        {
            text1: "1340 Reynolds Ave #116-1097",
            text2: "Irvine, CA 92614 United States"
        }
    ]

    const renderItem = (item: any) => {
        return (
            <AddressFlatlistCmp item={item} />
        )
    }
    return (
        <SafeAreaView style={style.mainView}>
            <AppThemeHeaderComponent onPressRight={() => { }} onPressRightLeft={() => { }}
                LeftIcon={images.filter}
                RightIcon={images.people}
                header={true}
                title1={'Welcome John!'}
                title2={'September, 2023'}
                imgStyle={style.imgStyle}
            />
            <View style={{ height: 160, backgroundColor: 'white' }}></View>
            <View style={style.flatlistHeaderView}>
                <Text style={style.flatlistHeader}>Appointments</Text>
            </View>
            <View>
                <FlatList
                    numColumns={1}
                    data={arryList}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={style.listInContainer}
                    style={style.listContainer}
                />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen
