import { useState } from 'react';
import { images } from '../../../utils/images';
const DATA = [
    {
        title: 'Bedroom No.1',
        data: [{ name: '1 Bathroom', img: images.bathroom }, { name: '1 King Bed', img: images.kingBed }],
    },
    {
        title: 'Bedroom No.2',
        data: [{ name: '1 Bathroom', img: images.bathroom }, { name: '1 Twin Bed', img: images.Bed }],
    },
    {
        title: 'Bedroom No.3',
        data: [{ name: '1 Twin Bed', img: images.Bed }],
    },
    {
        title: 'Common Area',
        data: [{ name: '1 Bathroom', img: images.bathroom }, { name: '1 Bed', img: images.Bed }],
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
