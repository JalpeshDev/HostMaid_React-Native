import { useRef, useState } from 'react';
import { images } from '../../../utils/images';
import PlatformType from '../../../utils/PlatformType';
import { Linking, Alert } from 'react-native'
import { useAppDispatch, useAppSelector } from '../../../redux';
import { disableTabNavigation, enableTabNavigation } from '../../../redux/slices/authSlice';
const checkInBtnText = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
const imgList: { id: number; url: any, }[] = [
    {
        id: 1,
        url: images.Home1,
    },
    {
        id: 2,
        url: images.Home2,
    },
    {
        id: 3,
        url: images.Home3,
    },
];
const fullViewImg = [
    {
        uri: "https://fastly.picsum.photos/id/869/200/200.jpg?hmac=Eqnjw4kAS1sFTick74KSN6CBN01wmQg8OpxqbGtdyCU",
    },
];
export default function viewModel() {
    const isClickable = useAppSelector((state: any) => state.authReducer.isClickable);
    const isCarousel = useRef<any>(null);
    const dispatch = useAppDispatch();
    const [state, setState] = useState<any>({
        isFullViewImgVisible: false,
        isInfoPopup: false,
        isShowHome: false,
        isImgScroll: false,
        isTimer: false,
        isImagePop: false,
        slideImgdata: [],
        isRunning: false,
        index: 0,
        checkInBtn: 0
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
    function createAList() {
        let tempArry: any[] = []
        imgList.forEach(element => {
            const data = {
                ...element,
                isCheck: false,
            }
            tempArry.push(data)
        });
        updateState({ slideImgdata: tempArry })
    }
    const callNumber = (phone: any) => {
        let phoneNumber = phone;
        if (PlatformType.ios) {
            phoneNumber = `telprompt:${phone}`;
        }
        else {
            phoneNumber = `tel:${phone}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
                if (!supported) {
                    Alert.alert('Phone number is not available');
                } else {
                    return Linking.openURL(phoneNumber);
                }
            })
            .catch(err => console.log(err));
    };
    const onScrollLeft = (index: any) => {
        if (isCarousel.current) {
            const newIndex = (index - 1 + state.slideImgdata.length) % state.slideImgdata.length;
            isCarousel.current.snapToItem(newIndex);
            updateState({ index: newIndex })
        }
    }

    const onScrollRight = (index: any) => {
        if (isCarousel.current) {
            const newIndex = (index + 1) % state.slideImgdata.length;
            isCarousel.current.snapToItem(newIndex);
            updateState({ index: newIndex })
        }
    }
    const isLeftArrowDisabled = state.index === 0;
    const isRightArrowDisabled = state.index === state.slideImgdata.length - 1;
    const handleTabNavigation = () => {
        if (isClickable) {
            dispatch(disableTabNavigation());
        } else {
            dispatch(enableTabNavigation());
        }

    };

    const onMarkerPress = () => {
        if (state.isShowHome) {
            updateState({ isFullViewImgVisible: !state.isFullViewImgVisible })
        } else {
            updateState({ isShowHome: !state.isShowHome })
        }
    }
    return {
        ...values,
        state,
        updateState,
        onChange,
        coordinates,
        createAList,
        checkInBtnText,
        callNumber,
        onScrollLeft,
        onScrollRight,
        isCarousel,
        isLeftArrowDisabled,
        isRightArrowDisabled,
        fullViewImg,
        isClickable,
        handleTabNavigation,
        onMarkerPress
    };
}

