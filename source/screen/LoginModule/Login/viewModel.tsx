import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userLoginAction } from '../../../redux/action/authAction';
import Toast from 'react-native-simple-toast';
import colors from '../../../utils/colors';
import { APIServiceManager, RequestType } from '../../../utils/APIViewModel/APIServiceManager';
import { apiUrl } from '../../../utils/apiUrl';
import { APIManager } from '../../../utils/APIViewModel/APIManager';
import { localStorage } from '../../../utils/localStorageProvider';
import routes from '../../../navigator/routes';
import navigationServices from '../../../navigator/navigationServices';
import { LocalStorageKey } from '../../../utils/strings';
export default function viewModel() {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [values, setValues] = useState({
        email: '',
        password: '',
        visiblePassword: true,
    });

    function onChange(value: any, prop: any) {
        setValues({ ...values, [prop]: value });
    }
    async function loginService() {
        try {
            let body = {
                email: values.email,
                password: values.password,
            }
            let data = {
                url: apiUrl.authUrl.userLogin,
                body: body,
            };
            if (body.email != "" && body.password != "") {
                setLoading(true)
                APIManager(data, RequestType.post).then((data: any) => {
                    if (data != null && data.data != null) {
                        setLoading(false)
                        localStorage.setItemObject("token", data?.data?.content?.access_token);
                        localStorage.setItemObject(LocalStorageKey.isLoggedIn, true);
                        navigationServices.navigateToNext(routes.HomeScreen, {})
                    } else {
                        setLoading(false)
                        Toast.show('Invalid login details', Toast.LONG, {
                            backgroundColor: colors.themeGreen,
                        });
                    }
                });
            } else {
                if (body.email == "" || body.email == undefined) {
                    Toast.show('Enter Email', Toast.LONG, {
                        backgroundColor: colors.themeGreen,
                    });
                } else if (body.password == undefined || body.password == "") {
                    Toast.show('Enter Password', Toast.LONG, {
                        backgroundColor: colors.themeGreen,
                    });
                }
            }

        } catch (error) {
            console.log(`Error fetching product data. ${error}`);
        }
    }
    return {
        ...values,
        onChange,
        loginService,
        loading
    };
}


