import { useState } from 'react';
const DATA = [
    {
        title: 'Notes',
        notes: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500sLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing.`
    },
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
