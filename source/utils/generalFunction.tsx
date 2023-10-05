// export const getCalendarDateAndDay = (year: number, month: number) => {
//     // Create a Date object for the given year and month
//     const date = new Date(year, month - 1, 1); // Note: Months are 0-based (0 = January, 11 = December)

//     // Get the number of days in the given month
//     const lastDay = new Date(year, month, 0).getDate();

//     // Initialize an array to hold the calendar data
//     const calendarData = [];

//     // Days of the week
//     const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];

//     // Helper function to calculate the ISO week number
//     const getISOWeekNumber = (date: any) => {
//         const target: any = new Date(date.valueOf());
//         const dayNr = (date.getDay() + 6) % 7;
//         target.setDate(target.getDate() - dayNr + 3);
//         const firstThursday = target.valueOf();
//         target.setMonth(0, 1);
//         if (target.getDay() !== 4) {
//             target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
//         }
//         return 1 + Math.ceil((firstThursday - target) / 604800000); // 604800000 ms per week
//     };

//     // Loop through each day of the month
//     for (let day = 1; day <= lastDay; day++) {
//         // Create a new Date object for the current day
//         const currentDate = new Date(year, month - 1, day);

//         // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
//         const dayOfWeekIndex = currentDate.getDay();
//         const dayOfWeekName = daysOfWeek[dayOfWeekIndex];

//         // Get the ISO week number for the current date
//         const weekNumber = getISOWeekNumber(currentDate);

//         // Push the date, day of the week index, day of the week name, and week number into the calendarData array
//         calendarData.push({
//             date: currentDate.getDate(),
//             dayOfWeekIndex,
//             dayOfWeekName,
//             weekNumber,
//         });
//     }

//     return calendarData;
// };

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