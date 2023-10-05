import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { AppThemeHeaderComponent } from '../../components/AppThemeHeaderComponent'
import { images } from '../../utils/images'
import { style } from './style'
import { AddressFlatlistCmp } from '../../components/AddressFlatlistCmp/AddressFlatlistCmp'
import Responsive from '../../utils/Responsive'
import WeekDisplay from '../../components/WeekCmp/WeekDisplay'
import viewModel from './viewModel'
import DateDisplay from '../../components/WeekCmp/DateDisplay'
import MonthPicker from 'react-native-month-year-picker'
import { CalendarInfo, } from '../../utils/generalFunction'
const HomeScreen = () => {
    const currentDate = new Date();
    let currentDay = currentDate.getDate()
    let day = currentDate.getDay()
    let currentWeek = Math.ceil((currentDay + 6 - day) / 7)
    const { values, onChange, createAList, monthNames, arryList } = viewModel()
    const [calendarDataArray, setCalendarDataArray] = useState<any>([]);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [dateShowArray, setDateShowArray] = useState([]);
    const [selectIndex, setSelectIndex] = useState(0);
    const [selectDate, setSelectDate] = useState(currentDay);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const currentMonth = monthNames[date.getMonth()];
    const currentYear = date.getFullYear();
    const formattedDate = `${currentMonth}, ${currentYear}`;

    useEffect(() => {
        createAList()
    }, [])

    const renderItem = (item: any) => {
        return (
            <AddressFlatlistCmp item={item} />
        )
    }
    const showPicker = useCallback((value: any) => setShow(value), []);
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
        setDateShowArray(calendarDataValues[0])
        setCalendarDataArray(() => [...calendarDataValues]);
    }, [date]);

    const checkCurrentWeek = (selectedDate: any) => {
        showPicker(false);
        setDate(selectedDate);
        setSelectIndex(0)
    }

    return (
        <SafeAreaView style={style.mainView}>
            <View style={{ paddingTop: Responsive.hp(1) }}>
                <AppThemeHeaderComponent onPressRight={() => { }} onPressRightLeft={() => { }}
                    LeftIcon={images.filter}
                    RightIcon={images.people}
                    header={true}
                    title1={'Welcome John!'}
                    title2={formattedDate}
                    imgStyle={style.imgStyle}
                    onDateSelect={() => showPicker(true)}
                />
            </View>

            <View style={style.weekMainView}>
                <View style={style.inWeekContainer}>
                    <View style={style.rowContainer}>
                        <ScrollView contentContainerStyle={{}}
                            horizontal={true} showsHorizontalScrollIndicator={false}>
                            {calendarDataArray.length != 0 &&
                                calendarDataArray.map((item: any, index: any) => {
                                    return (
                                        <WeekDisplay key={index} keyIndex={index} data={item}
                                            isCheckWeekView={selectIndex == index}
                                            onPressWeek={(data: any, keyIndex: any) => {
                                                setSelectIndex(keyIndex)
                                                setDateShowArray(data)
                                                setSelectDate(data[0].date)
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
                                                setSelectDate(data?.date)
                                            }}
                                        />
                                    )
                                })
                            }
                        </ScrollView>
                    </View>

                </View>
            </View>

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
            {show && (
                <MonthPicker
                    onChange={onValueChange}
                    value={date}
                    // maximumDate={new Date()}
                    locale="en"
                    mode="full"
                    autoTheme={false}
                />
            )}

        </SafeAreaView>
    )
}

export default HomeScreen
