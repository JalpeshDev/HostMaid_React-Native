import React from 'react';
import { images } from './images';
import { Image } from 'react-native'

import moment from "moment";
import { Alert } from 'react-native'
import Responsive from './Responsive';
import { GlobalStyle } from './GlobalStyle';
export const bottomIconsChange = (tab: any, color: any) => {
    switch (tab) {
        case 'Map':
            return <Image source={images.map} tintColor={color} style={GlobalStyle.bottomIconStyle} resizeMode='contain' />;
        case 'Codes':
            return <Image source={images.codes} tintColor={color} style={GlobalStyle.bottomIconStyle} resizeMode='contain' />;
        case 'Bath':
            return <Image source={images.bath} tintColor={color} style={GlobalStyle.bottomIconStyle} resizeMode='contain' />;
        case 'Misc':
            return <Image source={images.misc} tintColor={color} style={GlobalStyle.bottomIconStyle} resizeMode='contain' />;
        case 'Photos':
            return <Image source={images.photos} tintColor={color} style={GlobalStyle.bottomIconStyle} resizeMode='contain' />;
        default:
            break;
    }
};

export const getNumberOfWeeksInMonth = (year: any, month: any) => {
    // Create a Date object for the given year and month
    const date = new Date(year, month - 1, 1); // Note: Months are 0-based (0 = January, 11 = December)

    // Get the number of days in the given month
    const lastDay = new Date(year, month, 0).getDate();

    // Calculate the number of weeks
    const numberOfWeeks = Math.ceil((lastDay + date.getDay()) / 7);

    return numberOfWeeks;
};

export const getCalendarDateAndDay = (year: any, month: any) => {
    // Create a Date object for the given year and month
    const date = new Date(year, month - 1, 1); // Note: Months are 0-based (0 = January, 11 = December)

    // Initialize an array to hold the calendar data
    const calendarData = [];

    // Days of the week
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];

    // Helper function to calculate the week number
    const getWeekNumber = (date: any) => {
        const startOfYear: any = new Date(date.getFullYear(), 0, 1);
        const days = Math.floor((date - startOfYear) / 86400000); // 86400000 ms per day
        return Math.ceil((days + startOfYear.getDay() + 1) / 7);
    };

    // Loop through each day of the month
    for (let day = 1; day <= new Date(year, month, 0).getDate(); day++) {
        // Create a new Date object for the current day
        const currentDate = new Date(year, month - 1, day);

        // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        const dayOfWeekIndex = currentDate.getDay();
        const dayOfWeekName = daysOfWeek[dayOfWeekIndex];

        // Get the week number for the current date
        const weekNumber = getWeekNumber(currentDate);

        // Push the date, day of the week name, and week number into the calendarData array
        calendarData.push({
            date: currentDate.getDate(),
            dayOfWeekName,
            weekNumber,
        });
    }

    return calendarData;
};

export const CalendarInfo = (year: any, month: any) => {
    // Create a Date object for the given year and month
    const date = new Date(year, month - 1, 1); // Note: Months are 0-based (0 = January, 11 = December)

    // Initialize an object to hold the calendar data grouped by week
    const calendarDataByWeek: any = {};

    // Days of the week
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];

    // Helper function to calculate the week number
    const getWeekNumber = (date: any) => {
        const startOfYear: any = new Date(date.getFullYear(), 0, 1);
        const days = Math.floor((date - startOfYear) / 86400000); // 86400000 ms per day
        return Math.ceil((days + startOfYear.getDay() + 1) / 7);
    };

    // Loop through each day of the month
    for (let day = 1; day <= new Date(year, month, 0).getDate(); day++) {
        // Create a new Date object for the current day
        const currentDate = new Date(year, month - 1, day);

        // Get the week number for the current date
        const weekNumber = getWeekNumber(currentDate);

        // Create a new week array if it doesn't exist
        if (!calendarDataByWeek[weekNumber]) {
            calendarDataByWeek[weekNumber] = [];
        }

        // Push the date, day of the week name, and week number into the week array
        const dayOfWeekIndex = currentDate.getDay();
        const dayOfWeekName = daysOfWeek[dayOfWeekIndex];
        calendarDataByWeek[weekNumber].push({
            date: currentDate.getDate(),
            dayOfWeekName,
            weekNumber,
        });
    }

    return calendarDataByWeek;
};

export function convertDateWithFormat(publishTime: any) {
    let date = moment(publishTime);
    if (moment().diff(date, "year") >= 1) {
        let number = moment().diff(date, "year");
        return number + (number > 1 ? " years ago" : " year ago");
    } else if (moment().diff(date, "month") >= 1) {
        let number = moment().diff(date, "month");
        return number + (number > 1 ? " months ago" : " month ago");
    } else if (moment().diff(date, "week") >= 1) {
        let number = moment().diff(date, "week");
        return number + (number > 1 ? " weeks ago" : " week ago");
    } else if (moment().diff(date, "days") >= 1) {
        return date.fromNow() === "a day ago" ? "1 day ago" : date.fromNow(); // '2 days ago' etc.
    }
    else if (date.fromNow() === "a day ago") {
        return "1 day ago"
    }

    return date.calendar()
    // return `${date.calendar().split("at")[1]}`;
}

export const AlertPopUp = (props: any) => {
    return Alert.alert(
        `${props?.title}`,
        `${props?.message}`,
        [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: `${props?.btn}`,
                onPress: props?.btnPresed,
            },
        ],
    );

}

export const timeFormate = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return hours + ' : ' + minutes + ' : ' + seconds;
}