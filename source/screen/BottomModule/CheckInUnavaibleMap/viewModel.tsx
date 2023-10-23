import { useState } from 'react';

export default function viewModel() {
    const [state, setState] = useState<any>({
        isFullViewImgVisible: false,
        isInfoPopup: false,
        isShowHome: false,
        isImgScroll: false,
        timer: false,
        isImagePop: false
    });
    const [values, setValues] = useState({
        latitude: 0,
        longitude: 0
    });
    const [direction, setDirection] = useState()
    const [coordinates] = useState([
        {
            latitude: 23.0283,
            longitude: 72.5069,
        },
        {
            latitude: 23.0120,
            longitude: 72.5108,
        },
    ]);

    function onChange(value: any, prop: any) {
        setValues({ ...values, [prop]: value });
    }

    const updateState = (data: any) => setState((state: any) => ({ ...state, ...data }));
    return {
        ...values,
        state,
        updateState,
        onChange,
        coordinates
    };
}

