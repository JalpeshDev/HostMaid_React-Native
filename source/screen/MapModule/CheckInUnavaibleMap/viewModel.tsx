import { useState } from 'react';

export default function viewModel() {
    const [values, setValues] = useState({
        latitude: 0,
        longitude: 0
    });
    const [direction, setDirection] = useState()
    const [coordinates] = useState([
        {
            latitude: 48.8587741,
            longitude: 2.2069771,
        },
        {
            latitude: 48.8323785,
            longitude: 2.3361663,
        },
    ]);

    function onChange(value: any, prop: any) {
        setValues({ ...values, [prop]: value });
    }

    return {
        ...values,
        onChange,
        coordinates
    };
}
