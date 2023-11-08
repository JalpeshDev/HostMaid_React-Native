import { useState } from 'react';
import { images } from '../../../utils/images';
const DATA = [
    {
        title: 'Do you need back up sheet/towels? ',
        data: 'Sheet, Towels'
    },
    {
        title: "What kind of coffee pot do you have?",
        data: "Regular"
    },
    {
        title: "Do you allow pets?",
        data: "Yes"
    },
    {
        title: "Trash Day",
        data: "Monday, Thursday"
    },
    {
        title: "Recycling Day",
        data: "Wednesday"
    },
    {
        title: "Additional information",
        data: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500sLorem Ipsum is simply dummy text of the printing and typesetting industry.`
    },
    {
        title: "Checkout method",
        data: "Cash"
    }
];
export default function viewModel() {
    const [state, setState] = useState<any>({

    });

    const updateState = (data: any) => setState((state: any) => ({ ...state, ...data }));

    return {
        state,
        DATA
    };
}
