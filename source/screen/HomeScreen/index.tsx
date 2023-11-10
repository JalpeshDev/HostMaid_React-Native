import { FlatList, SafeAreaView, Text, View, ScrollView, Image, StatusBar } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import AppThemeHeaderComponent from '../../components/AppThemeHeaderComponent'
import { images } from '../../utils/images'
import { style } from './style'
import { AddressFlatlistCmp } from '../../components/AddressFlatlistCmp/AddressFlatlistCmp'
import Responsive from '../../utils/Responsive'
import WeekDisplay from '../../components/WeekCmp/WeekDisplay'
import viewModel from './viewModel'
import DateDisplay from '../../components/WeekCmp/DateDisplay'
import MonthPicker from 'react-native-month-year-picker'
import { CalendarInfo, } from '../../utils/generalFunction'
import { getBookingsAction } from '../../redux/action/authAction'
import Loader from '../../components/Loader'
import { Strings } from '../../utils/strings'
import navigationServices from '../../navigator/navigationServices'
import routes from '../../navigator/routes'
import { useAppDispatch, useAppSelector } from '../../redux'
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { GlobalStyle } from '../../utils/GlobalStyle'
import { useGetBookingByDateQuery } from '../../redux/services/ApiQuery'
import MapView from 'react-native-maps'
import PlatformType from '../../utils/PlatformType'
import colors from '../../utils/colors'


const HomeScreen = () => {
    const dispatch = useAppDispatch();
    const isFocused = useIsFocused();

    const {
        state,
        updateState,
        arryList,
        createTwoButtonAlert, year, month,
        formattedDate, currentDay,
        currentMonth, currentYear, currentWeek } = viewModel()
    const {
        calendarDataArray,
        date,
        show,
        dateShowArray,
        selectIndex,
        selectDate,
        showAppoinment,
        flatlistData } = state
    const { isLoading, data } = useGetBookingByDateQuery(`${year}-${month}-${selectDate}`)

    useEffect(() => {
        dispatch(getBookingsAction());
    }, [])

    const renderItem = (item: any) => {
        return (
            <AddressFlatlistCmp item={item} property_id={item?.item?.property_id}
                onArrowPress={() => navigationServices.navigateToNext(routes.BottomNavigation, { property_id: item?.item?.property_id })}
            />
        )
    }

    const showPicker = useCallback((value: any): any => updateState({ show: value }), []);

    const onValueChange = useCallback(
        (event: any, newDate: any) => {
            const selectedDate = newDate || date;
            switch (event) {
                case "dateSetAction":
                    checkCurrentWeek(selectedDate)
                    break;
                case "dismissedAction":
                    showPicker(false);
                    break;
                default:
                    showPicker(false);
            }
        },
        [date, showPicker],
    );

    useEffect(() => {
        const calendarData = CalendarInfo(year, month);
        const calendarDataValues: any = Object.values(calendarData);
        updateState({ dateShowArray: calendarDataValues[selectIndex] })
        if (currentMonth == month && currentYear == year) {
            if (currentWeek - 1 == selectIndex) {
                updateState({ selectDate: currentDay })
            } else {
                updateState({ selectDate: calendarDataValues[selectIndex][0].date })
            }
        } else {
            updateState({ selectDate: calendarDataValues[selectIndex][0].date })
        }
        updateState({ calendarDataArray: [...calendarDataValues] })
    }, [date, selectIndex]);

    const checkCurrentWeek = (selectedDate: any) => {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
        showPicker(false);
        updateState({ date: selectedDate })
        if (currentMonth === month && currentYear === year) {
            updateState({ selectIndex: currentWeek - 1 })
        } else {
            updateState({ selectIndex: 0 })
        }
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
            <View style={{ paddingTop: Responsive.hp(1.5) }}>
                <AppThemeHeaderComponent onPressRight={() => { createTwoButtonAlert() }} onPressRightLeft={() => { }}
                    LeftIcon={images.filter}
                    RightIcon={images.people}
                    header={true}
                    title1={Strings.HeaderTitle1}
                    title2={formattedDate}
                    imgStyle={style.imgStyle}
                    onDateSelect={() => showPicker(true)}
                />
            </View>
            <Loader loading={isLoading} />
            <View style={style.weekMainView}>
                <View style={style.inWeekContainer}>
                    <View style={style.rowContainer}>
                        <ScrollView
                            horizontal={true} showsHorizontalScrollIndicator={false}>
                            {calendarDataArray.length != 0 &&
                                calendarDataArray.map((item: any, index: any) => {
                                    return (
                                        <WeekDisplay key={index} keyIndex={index} data={item}
                                            isCheckWeekView={selectIndex}
                                            onPressWeek={(data: any, keyIndex: any) => {
                                                updateState({ selectIndex: keyIndex })
                                                updateState({ dateShowArray: data })
                                                if (currentMonth == month && currentYear == year) {
                                                    const result = data.filter((element: any) => element.date == currentDay);
                                                    if (result.length > 0) {
                                                        updateState({ selectDate: currentDay })
                                                    } else {
                                                        updateState({ selectDate: data[0].date })
                                                    }
                                                } else {
                                                    updateState({ selectDate: data[0].date })
                                                }
                                            }}
                                        />
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                    <View style={{ ...style.rowContainer, ...style.paddingBottom, }}>
                        <ScrollView
                            contentContainerStyle={{}}
                            horizontal={true} showsHorizontalScrollIndicator={false}>
                            {
                                dateShowArray.length != 0 &&
                                dateShowArray.map((item: any, index: any) => {
                                    return (
                                        <DateDisplay key={index} data={item}
                                            isCheckDateView={item?.date == selectDate}
                                            onPressDate={(data: any) => {
                                                updateState({ selectDate: data?.date })
                                            }}
                                        />
                                    )
                                })
                            }
                        </ScrollView>
                    </View>

                </View>
            </View>
            {data?.data?.length != 0 ?
                <View>
                    <View style={style.flatlistHeaderView}>
                        <Text style={style.flatlistHeader}>Appointments</Text>
                    </View>
                    <FlatList
                        numColumns={1}
                        data={isLoading ? [] : data?.data}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={style.listInContainer}
                        style={style.listContainer}
                        extraData={isFocused}
                    />
                </View>
                :
                <View style={style.dataNot}>
                    <Image source={images.notFound} style={style.dataNotImg}
                        resizeMode='contain' />
                    <Text style={style.dataNotText}>No Appointments Founds!</Text>
                </View>
            }
            {show && (
                <MonthPicker
                    onChange={onValueChange}
                    value={date}
                    locale="en"
                    mode="full"
                    autoTheme={false}
                />
            )}
        </SafeAreaView>
    )
}

export default HomeScreen
