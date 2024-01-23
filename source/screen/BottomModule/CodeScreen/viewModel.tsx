import { useState } from 'react';

// const data = [
//     { id: 0, label: "Gate code", number: [{ key: 1, }, { key: 2 }, { key: 3 }, { key: 4 }] },
//     { id: 1, label: "Door code", number: [{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }] },
//     { id: 2, label: "Access code", number: [{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }] },
//     { id: 3, label: "Alarm code", number: [{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }] },
//     { id: 4, label: "Parking Info", number: [{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }] },
// ]
const data1 = [
    { id: 0, label: "Gate code", value: '', key: 'gate_code', number: [] },
    { id: 1, label: "Door code", value: '', key: 'door_code', number: [] },
    { id: 2, label: "Access code", value: '', key: 'access_code', number: [] },
    { id: 3, label: "Alarm code", value: '', key: 'alarm_code', number: [] },
    { id: 4, label: "Parking Info", value: '', key: 'parking', number: [] },
]

export default function viewModel() {
    const [values, setValues] = useState({
        arryList: [],
    });

    function onChange(value: any, prop: any) {
        setValues({ ...values, [prop]: value });
    }
    /**
       * create a list
       */

    function createAList(data: any) {

        let temp: any = []
        data1.map((element: any) => {
            const value = data[element.key]
            if (value == null || value == undefined) {
                temp.push({ ...element })
            }
            else if (value.length > 0) {
                let array = value.split('');
                console.log("data==>", data);
                temp.push({ ...element, number: array, value: value })
            }

        });
        console.log("temp-->", temp)
        onChange(temp, "arryList");
    }
    /**
     * check if one item selected or not
     * @returns 
     */
    const isActive = () => {
        const value = data1.filter((item: any) => {
            return (item.isCheck == true)
        })

        return value.length > 0
    }
    return {
        values,
        onChange,
        createAList,
        isActive, data1
    };
}
