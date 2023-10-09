import { FlatList, SafeAreaView, Text, View, ScrollView, Image } from 'react-native'
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
import { useDispatch, useSelector } from 'react-redux'
import { getBookingsAction } from '../../redux/action/authAction'
import Loader from '../../components/Loader'

const HomeScreen = () => {
    const dispatch = useDispatch();
    const currentDate = new Date();
    let currentDay = currentDate.getDate()
    let day = currentDate.getDay()
    let currentMonth = currentDate.getMonth() + 1
    let currentYear = currentDate.getFullYear()
    let currentWeek = Math.ceil((currentDay + 6 - day) / 7)

    const { createAList, monthNames, arryList, createTwoButtonAlert } = viewModel()
    const [calendarDataArray, setCalendarDataArray] = useState<any>([]);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [dateShowArray, setDateShowArray] = useState([]);
    const [selectIndex, setSelectIndex] = useState(currentWeek - 1);
    const [selectDate, setSelectDate] = useState(currentDay);
    const [showAppoinment, setShowAppoinment] = useState(false);
    const [flatlistData, setFlatlistData] = useState([]);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const monthFormate = monthNames[date.getMonth()];
    const yearFormate = date.getFullYear();
    const formattedDate = `${monthFormate}, ${yearFormate}`;


    const { data, loading } = useSelector((state: any) => state.bookingReducer);;

    useEffect(() => {
        createAList();
        dispatch(getBookingsAction());
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
        setDateShowArray(calendarDataValues[selectIndex])
        if (currentMonth == month && currentYear == year) {
            if (currentWeek - 1 == selectIndex) {
                setSelectDate(currentDay)
            } else {
                setSelectDate(calendarDataValues[selectIndex][0].date)
            }
        } else {
            setSelectDate(calendarDataValues[selectIndex][0].date)
        }
        setCalendarDataArray(() => [...calendarDataValues]);
    }, [date, selectIndex]);

    const checkCurrentWeek = (selectedDate: any) => {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
        showPicker(false);
        setDate(selectedDate);
        if (currentMonth === month && currentYear === year) {
            setSelectIndex(currentWeek - 1)
        } else {
            setSelectIndex(0)
        }
    }

    useEffect(() => {
        const result: any = data?.data?.filter((item: any) => {
            const bookingDate = new Date(item.cleaning_date);
            let filterDate = bookingDate.getDate();
            let filterMonth = bookingDate.getMonth() + 1;
            let filterYear = bookingDate.getFullYear();
            return filterDate == selectDate && filterMonth == month && filterYear == year;
        });
        if (result?.length != 0) {
            setFlatlistData(result)
            setShowAppoinment(true)
        } else {
            if (currentMonth === month && currentYear === year && currentDay == selectDate) {
                setFlatlistData(arryList)
                setShowAppoinment(true)
            } else {
                setShowAppoinment(false)
            }
        }
    }, [selectIndex, selectDate, loading])

    return (
        <SafeAreaView style={style.mainView}>
            <View style={{ paddingTop: Responsive.hp(1.5) }}>
                <AppThemeHeaderComponent onPressRight={() => { createTwoButtonAlert() }} onPressRightLeft={() => { }}
                    LeftIcon={images.filter}
                    RightIcon={images.people}
                    header={true}
                    title1={'Welcome John!'}
                    title2={formattedDate}
                    imgStyle={style.imgStyle}
                    onDateSelect={() => showPicker(true)}
                />
            </View>
            <Loader loading={loading} />
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
                                                setSelectIndex(keyIndex)
                                                setDateShowArray(data)
                                                if (currentMonth == month && currentYear == year) {
                                                    const result = data.filter((element: any) => element.date == currentDay);
                                                    if (result.length > 0) {
                                                        setSelectDate(currentDay)
                                                    } else {
                                                        setSelectDate(data[0].date)
                                                    }
                                                } else {
                                                    setSelectDate(data[0].date)
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
            {showAppoinment ?
                <View>
                    <View style={style.flatlistHeaderView}>
                        <Text style={style.flatlistHeader}>Appointments</Text>
                    </View>
                    <FlatList
                        numColumns={1}
                        data={loading ? [] : flatlistData}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={style.listInContainer}
                        style={style.listContainer}
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
