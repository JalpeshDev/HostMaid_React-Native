import { useState } from 'react';

export default function viewModel() {
    const [values, setValues] = useState({
        email: '',
        password: '',
        visiblePassword: true,
    });

    function onChange(value: any, prop: any) {
        setValues({ ...values, [prop]: value });
    }

    return {
        ...values,
        onChange,
    };
}
