import { useState } from "react";
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


    return {
        values,
        onChange,
        createAList,
        monthNames,
        arryList
    };
}
