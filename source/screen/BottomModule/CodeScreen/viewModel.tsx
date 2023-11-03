import { useState } from 'react';

const data = [
    { id: 0, label: "Gate code", number: [{ key: 1, }, { key: 2 }, { key: 3 }, { key: 4 }] },
    { id: 1, label: "Door code", number: [{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }] },
    { id: 2, label: "Access code", number: [{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }] },
    { id: 3, label: "Alarm code", number: [{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }] },
    { id: 4, label: "Parking Info", number: [{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }] },
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

    function createAList() {
        const newArray = data.map((element) => {
            const newNumberArray = element.number.map((item, index) => ({
                ...item,
                isCheck: false,
            }));

            return {
                ...element,
                number: newNumberArray,
            };
        });
        onChange(newArray, "arryList");
    }
    /**
     * check if one item selected or not
     * @returns 
     */
    const isActive = () => {
        const value = data.filter((item: any) => {
            return (item.isCheck == true)
        })

        return value.length > 0
    }
    return {
        values,
        onChange,
        data,
        createAList,
        isActive
    };
}
