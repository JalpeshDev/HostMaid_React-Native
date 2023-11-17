import { useRef, useState } from 'react';
import { images } from '../../../utils/images';
import PlatformType from '../../../utils/PlatformType';
import { Linking, Alert, Dimensions } from 'react-native'
import { useAppDispatch, useAppSelector } from '../../../redux';
import { disableTabNavigation, enableTabNavigation } from '../../../redux/slices/authSlice';
import { AnimatedRegion } from 'react-native-maps';
const checkInBtnText = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
const imgList: { id: number; url: any, checkList: any }[] = [
    {
        id: 0,
        url: images.Home1,
        checkList: [
            { checkList: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.` },
            { checkList: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.` },
            { checkList: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.` },
        ]
    },
    {
        id: 1,
        url: images.Home2,
        checkList: [
            { checkList: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.` },
        ]
    },
    {
        id: 2,
        url: images.Home3,
        checkList: [
            { checkList: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.` },
            { checkList: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.` },
            { checkList: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.` },
            { checkList: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.` },
            { checkList: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.` },
        ]
    },
];
const fullViewImg = [
    {
        uri: "https://fastly.picsum.photos/id/869/200/200.jpg?hmac=Eqnjw4kAS1sFTick74KSN6CBN01wmQg8OpxqbGtdyCU",
    },
];
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export default function viewModel() {
    const isClickable = useAppSelector((state: any) => state.authReducer.isClickable);
    const isCarousel = useRef<any>(null);
    const mapRef: any = useRef()
    const markerRef: any = useRef()
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
        checkInBtn: 0,
        curLoc: {
            // latitude: 32.253460,
            // longitude: -110.811789,
            latitude: 23.0283,  //development
            longitude: 72.5069
        },
        destinationCords: {
            // latitude: 32.253460,
            // longitude: -110.911789,
            latitude: 23.0120, //development
            longitude: 72.5108
        },
        coordinate: new AnimatedRegion({
            // latitude: 32.253460,
            // longitude: -110.811789,
            latitude: 23.0283,  //development
            longitude: 72.5069,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }),
        time: 0,
        distance: 0,
        heading: 0
    });

    const updateState = (data: any) => setState((state: any) => ({ ...state, ...data }));
    function createAList() {
        const newArray = imgList.map((element) => {
            const newCheckListArray = element?.checkList.map((item: any) => ({
                ...item,
                isCheck: false,
            }));

            return {
                ...element,
                checkList: newCheckListArray,
            };
        });
        updateState({ slideImgdata: newArray })
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
        state,
        updateState,
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
        onMarkerPress,
        mapRef,
        markerRef
    };
}

