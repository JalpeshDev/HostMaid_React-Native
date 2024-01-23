import { View, StatusBar, FlatList } from 'react-native';
import React, { useCallback } from 'react';
import { GlobalStyle } from '../../../utils/GlobalStyle';
import { NavigationHeader } from '../../../components/AppThemeHeaderComponent/navigationHeader';
import { Strings } from '../../../utils/strings';
import PlatformType from '../../../utils/PlatformType';
import colors from '../../../utils/colors';
import { style } from '../Bath/style';
import { useAppSelector } from '../../../redux';
import viewModel from './viewModel';
import MiscCmp from '../../../components/ListCmp/MiscCmp';

const Misc = () => {
    const { elapsed } = useAppSelector((state) => state.authReducer);
    // const { DATA } = viewModel();
    const { loading, bookingDetails } = useAppSelector((state: any) => state.bookingReducer);

    const DATA = [
        {
            title: 'Do you need back up sheet/towels? ',
            data: bookingDetails?.property?.sheets == 1 ? "Sheet" : 'Towels'
        },
        {
            title: "What kind of coffee pot do you have?",
            data: bookingDetails?.property?.coffee_pot_type ? bookingDetails?.property?.coffee_pot_type : "Regular"
        },
        {
            title: "Do you allow pets?",
            data: bookingDetails?.property?.pets_allowed == 0 ? "No" : "Yes"
        },
        {
            title: "Trash Day",
            data: bookingDetails?.property?.trash_day ? bookingDetails?.property?.trash_day : "Monday, Thursday"
        },
        {
            title: "Recycling Day",
            data: bookingDetails?.property?.recycling ? bookingDetails?.property?.recycling : "Wednesday"
        },
        {
            title: "Additional information",
            data: bookingDetails?.property?.description ? bookingDetails?.property?.description :
                `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500sLorem Ipsum is simply dummy text of the printing and typesetting industry.`
        },
        {
            title: "Checkout method",
            data: bookingDetails?.property?.checkout_method ? bookingDetails?.property?.checkout_method : "Cash"
        }
    ];

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

export default Misc;


