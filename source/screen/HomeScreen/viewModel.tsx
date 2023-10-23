import { useState } from "react";
import { AlertPopUp } from "../../utils/generalFunction";
import { Strings } from "../../utils/strings";
import { localStorage } from "../../utils/localStorageProvider";
import navigationServices from "../../navigator/navigationServices";
import routes from "../../navigator/routes";

const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];
const arryList: any = [
    {
        property_name: "1340 Reynolds Ave #116-1097",
        property_address1: "Irvine, CA 92614 United States",
        cleaning_date: "2023-08-28 00:00:00",
    },
    {
        property_name: "1340 Reynolds Ave #116-1097",
        property_address1: "Irvine, CA 92614 United States",
        cleaning_date: "2023-10-06T10:11:21.189Z",

    },
    {
        property_name: "1340 Reynolds Ave #116-1097",
        property_address1: "Irvine, CA 92614 United States",
        cleaning_date: "2023-08-28 00:00:00",

    },
    {
        property_name: "1340 Reynolds Ave #116-1097",
        property_address1: "Irvine, CA 92614 United States",
        cleaning_date: "2023-10-06T10:11:21.189Z",

    },
]
export default function viewModel() {
    const currentDate = new Date();
    let currentDay = currentDate.getDate()
    let day = currentDate.getDay()
    let currentMonth = currentDate.getMonth() + 1
    let currentYear = currentDate.getFullYear()
    let currentWeek = Math.ceil((currentDay + 6 - day) / 7)
    const [state, setState] = useState<any>({
        calendarDataArray: [],
        date: new Date(),
        show: false,
        dateShowArray: [],
        selectIndex: currentWeek - 1,
        selectDate: currentDay,
        showAppoinment: false,
        flatlistData: []
    });
    const year = state?.date?.getFullYear();
    const month = state?.date?.getMonth() + 1;
    const monthFormate = monthNames[state?.date?.getMonth()];
    const yearFormate = state?.date.getFullYear();
    const formattedDate = `${monthFormate}, ${yearFormate}`;

    const updateState = (data: any) => setState((state: any) => ({ ...state, ...data }));

    /**
     * Pop up alert
     */
    const createTwoButtonAlert = () => {
        AlertPopUp({
            title: `${Strings.SignOutTitle}`, message: `${Strings.SignOutMsg}`, btn: `${Strings.SignOutBtn}`,
            btnPresed: () => { SignOut() }
        })
    }
    /**
    * Sign out function
    */
    const SignOut = async () => {
        try {
            localStorage.clear();
            navigationServices.navigateAndReset(routes.Login);
        } catch (error) {
            console.error(error);
        }
    };

    return {
        state,
        updateState,
        arryList,
        createTwoButtonAlert, year, month,
        formattedDate, currentDate, currentDay,
        currentMonth, currentYear, currentWeek
    };
}
