import { useState } from "react";
import { AlertPopUp } from "../../utils/generalFunction";
import { Strings } from "../../utils/strings";
import { localStorage } from "../../utils/localStorageProvider";
import navigationServices from "../../navigator/navigationServices";
import routes from "../../navigator/routes";
const passArryList = [
    { id: 0, week: "Week 1" },
    { id: 1, week: "Week 2" },
    { id: 2, week: "Week 3" },
    { id: 3, week: "Week 4" },
    { id: 4, week: "Week 5" },
    { id: 5, week: "Week 6" },

]

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
    const [values, setValues] = useState<any>({
        arryList: [],
    });

    /**
     * update value based on key and value
     * @param value 
     * @param prop 
     */
    function onChange(value: any, prop: any) {
        setValues({ ...values, [prop]: value });
    }

    /**
     * create a list
     */
    function createAList() {
        let tempArry: any[] = []
        passArryList.forEach(element => {
            const data = {
                ...element,
                isCheck: false,
            }
            tempArry.push(data)
        });
        onChange(tempArry, "arryList")
    }

    const createTwoButtonAlert = () => {
        AlertPopUp({
            title: `${Strings.SignOutTitle}`, message: `${Strings.SignOutMsg}`, btn: `${Strings.SignOutBtn}`,
            btnPresed: () => { SignOut() }
        })
    }
    const SignOut = async () => {
        try {
            localStorage.clear();
            navigationServices.navigateAndReset(routes.Login);
        } catch (error) {
            console.error(error);
        }
    };
    return {
        values,
        onChange,
        createAList,
        monthNames,
        arryList,
        createTwoButtonAlert
    };
}
