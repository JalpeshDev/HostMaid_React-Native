import React, { useRef, useState, useEffect } from 'react';
import { Dimensions, PermissionsAndroid, SafeAreaView, View, Alert, Platform, Image, TouchableOpacity, Linking } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, Callout } from 'react-native-maps';
import viewModel from './viewModel';
import colors from '../../../utils/colors';
import Responsive from '../../../utils/Responsive';
import { style } from './style';
import { AppThemeHeaderComponent } from '../../../components/AppThemeHeaderComponent';
import { images } from '../../../utils/images';
import MapAddressCmp from '../../../components/MapAddressCmp';
import { ThemeButtonComponent } from '../../../components/ThemeButtonComponent';
import navigationServices from '../../../navigator/navigationServices';
import MapViewDirections from 'react-native-maps-directions';
import { useDispatch, useSelector } from 'react-redux';
import { disableTabNavigation, enableTabNavigation } from '../../../redux/slices/authSlice';
import { Strings } from '../../../utils/strings';
import { NavigationHeader } from '../../../components/AppThemeHeaderComponent/navigationHeader';
import ImageView from 'react-native-image-viewing'
import InfoPopUp from '../../../components/PopUp/InfoPopUp';
import Carousel, { Pagination } from "react-native-snap-carousel";
import TimerCmp from '../../../components/TimerCmp';
export const SLIDER_WIDTH = Dimensions.get('window').width + 30;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const CheckInUnavaibleMap = ({ route }: any) => {
    const [checkInBtn, setCheckInBtn] = useState(0)
    const [index, setIndex] = useState(0);
    const isCarousel = useRef<any>(null);
    const { onChange, coordinates, state, updateState } = viewModel()
    const { isFullViewImgVisible, isInfoPopup, isShowHome, isImgScroll, timer, isImagePop } = state;
    const data: { id: number; url: any }[] = [
        {
            id: 1,
            url: images.sliderImg1,
        },
        {
            id: 2,
            url: images.Home1,
        },
        {
            id: 3,
            url: images.Home2,
        },
    ];
    const dispatch = useDispatch();
    const isClickable = useSelector((state: any) => state.authReducer.isClickable);
    // const { location } = route.params
    const fullViewImg = [
        {
            uri: "https://fastly.picsum.photos/id/869/200/200.jpg?hmac=Eqnjw4kAS1sFTick74KSN6CBN01wmQg8OpxqbGtdyCU",
        },
    ];
    const renderImageSlider = ({ item }: any) => {
        return (
            <View style={style.backgroundSlider}>
                <Image source={item.url} style={style.imageSlider} />
            </View>
        );
    };

    useEffect(() => {
        const requestLocationPermission = async () => {
            if (Platform.OS === 'android') {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Location Permission',
                            message: 'This app needs access to your location to function properly.',
                        }
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        getLocation();
                    } else {
                        Alert.alert('Location permission denied.');
                    }
                } catch (err) {
                    console.warn(err);
                }
            } else {
                getLocation();
            }
        };
        const getLocation = () => {
            Geolocation.getCurrentPosition(
                (position) => {
                    onChange(position.coords.latitude, "latitude");
                    onChange(position.coords.longitude, "longitude");
                    // setCoordinates((prevCoordinates) => [
                    //     ...prevCoordinates,
                    //     {
                    //         latitude: position.coords.latitude,
                    //         longitude: position.coords.longitude,
                    //     },
                    // ]);
                },
                (error) => {
                    Alert.alert(error.message.toString());
                },
                {
                    showLocationDialog: true,
                    enableHighAccuracy: true,
                    timeout: 20000,
                    maximumAge: 0,
                }
            );

            Geolocation.watchPosition(
                (position) => {
                    onChange(position.coords.latitude, "latitude");
                    onChange(position.coords.longitude, "longitude");
                    // setCoordinates((prevCoordinates) => [
                    //     ...prevCoordinates,
                    //     {
                    //         latitude: position.coords.latitude,
                    //         longitude: position.coords.longitude,
                    //     },
                    // ]);
                },
                (error) => {
                    console.log(error);
                },
                {
                    showLocationDialog: true,
                    enableHighAccuracy: true,
                    timeout: 20000,
                    maximumAge: 0,
                    distanceFilter: 0,
                }
            );
        };

        requestLocationPermission();
    }, []);

    const handleTabNavigation = () => {
        if (isClickable) {
            dispatch(disableTabNavigation());
        } else {
            dispatch(enableTabNavigation());
        }

    };
    const onScrollLeft = (index: any) => {
        if (isCarousel.current) {
            const newIndex = (index - 1 + data.length) % data.length;
            isCarousel.current.snapToItem(newIndex);
            setIndex(newIndex);
        }
    }
    const onScrollRight = (index: any) => {
        if (isCarousel.current) {
            const newIndex = (index + 1) % data.length;
            isCarousel.current.snapToItem(newIndex);
            setIndex(newIndex);
        }
    }
    const isLeftArrowDisabled = index === 0;
    const isRightArrowDisabled = index === data.length - 1;

    const onMarkerPress = () => {
        if (isShowHome) {
            updateState({ isFullViewImgVisible: !isFullViewImgVisible })
        } else {
            updateState({ isShowHome: !isShowHome })
        }
    }
    const callNumber = (phone: any) => {
        let phoneNumber = phone;
        if (Platform.OS !== 'android') {
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

    return (
        <SafeAreaView style={style.mainView}>
            <NavigationHeader LeftIcon={images.backIcon} RightIcon={images.Info} checkInBtn={checkInBtn} timer={timer}
                onPressLeft={() => navigationServices.navigationGoBack()} onPressRight={() => updateState({ isInfoPopup: !isInfoPopup })} />
            {isImgScroll ?
                <View style={style.mapView}>
                    <View style={style.imgContainer}>
                        <View style={style.arrowContainer}>
                            {data.length != 0 &&
                                <TouchableOpacity style={style.arrowView} onPress={() => onScrollLeft(index)} disabled={isLeftArrowDisabled}>
                                    <Image source={images.BackArrow} resizeMode='contain'
                                        style={style.arrowImg} tintColor={isLeftArrowDisabled ? colors.blackGrey30 : colors.black} />
                                </TouchableOpacity>
                            }

                        </View>

                        <View style={style.CarouselStyle}>
                            <Carousel
                                ref={isCarousel}
                                data={data}
                                renderItem={renderImageSlider}
                                sliderWidth={Responsive.hp(32.7)}
                                itemWidth={Responsive.hp(32.7)}
                                onSnapToItem={(index) => setIndex(index)}
                                scrollEnabled={true}
                            />
                        </View>
                        <View style={style.arrowContainer}>
                            {data.length != 0 &&
                                <TouchableOpacity style={style.arrowView} onPress={() => onScrollRight(index)} disabled={isRightArrowDisabled}>
                                    <Image source={images.ForwordArrow} resizeMode='contain'
                                        style={style.arrowImg} tintColor={isRightArrowDisabled ? colors.blackGrey30 : colors.black} />
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                </View>
                :
                <MapView onPress={() => updateState({ isShowHome: !isShowHome })}
                    showsScale={true}
                    zoomControlEnabled={true}
                    zoomTapEnabled={true}
                    showsMyLocationButton={true}
                    showsCompass={true}
                    provider={PROVIDER_GOOGLE}
                    style={style.mapView}
                    region={{
                        latitude: coordinates[0].latitude,
                        longitude: coordinates[0].longitude,
                        latitudeDelta: 0.0622,
                        longitudeDelta: 0.0121,
                    }}
                >
                    <Marker coordinate={coordinates[0]}>
                        <View style={style.lightGreenRing}>
                            <View style={style.greyRing}>
                                <View style={style.sourceIconStyle}>
                                    <Image source={images.SourceAvtar} style={style.markerStyle} resizeMode='contain' />
                                </View>
                            </View>
                        </View>
                    </Marker>
                    <Marker coordinate={coordinates[1]}
                        onPress={() => onMarkerPress()}
                    >
                        <TouchableOpacity style={style.markerInsideView} >
                            {isShowHome &&
                                <TouchableOpacity>
                                    <Image source={images.CircleHouse}
                                        style={style.homeImages} />
                                </TouchableOpacity>
                            }
                            <TouchableOpacity style={style.destinationIconStyle} onPress={() => updateState({ isShowHome: !isShowHome })}>
                                <Image source={images.HomeDestination} style={style.markerStyle} resizeMode='contain' />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </Marker>
                    {/* <MapViewDirections
                        origin={coordinates[0]}
                        destination={coordinates[1]}
                        apikey={"AIzaSyDjEiy7CxRSQsFGV0yGo8lHfrFxH8V-fYU"}
                        strokeWidth={4}
                        strokeColor={colors.directionLine}
                        strokeColors={['#7F0000']}
                        optimizeWaypoints={true}
                        onReady={result => {
                            console.log(`Distance: ${result.distance} km`)
                            console.log(`Duration: ${result.duration} min.`)
                            // mapRef.current.fitToCoordinates(result.coordinates, {
                            //     edgePadding: {
                            //         right: 30,
                            //         bottom: 300,
                            //         left: 30,
                            //         top: 100,
                            //     },
                            // });
                        }}

                    /> */}
                    <Polyline
                        coordinates={coordinates}
                        strokeColor={colors.themeGreen}
                        strokeColors={['#7F0000']}
                        strokeWidth={6}
                    />
                </MapView>
            }
            <View style={style.MapDownView}>
                <View style={style.btnContainer} />
                <AppThemeHeaderComponent onPressRight={() => { Linking.openURL('sms:+1 123-456-7890') }} onPressRightLeft={(numer: any) => { callNumber(numer) }}
                    LeftIcon={images.callImg}
                    RightIcon={images.messageImg}
                />
                <MapAddressCmp icon={images.locationImg} />
                <View style={style.timerContainer}>
                    {timer && <TimerCmp />}
                </View>
                <View style={style.bottomContainer}>
                    <ThemeButtonComponent title={checkInBtn == 2 ? Strings.CheckOut : Strings.CheckIn}
                        isActive={isClickable ? true : false}
                        buttonStyle={{ ...style.btn, }}
                        onPress={() => {
                            if (checkInBtn == 0) {
                                setCheckInBtn(checkInBtn + 1)
                            } else if (checkInBtn == 1) {
                                updateState({ isInfoPopup: !isInfoPopup })
                                // setCheckInBtn(checkInBtn + 1)
                            } else { }
                            // handleTabNavigation()
                        }}
                        onValidation={() => {
                        }}
                        checkInBtn={checkInBtn}
                    />
                </View>
            </View>
            {isInfoPopup &&
                <InfoPopUp isInfoPopup={isInfoPopup} setIsPopup={updateState}
                    timer={timer} isImgScroll={isImgScroll} checkInBtn={checkInBtn}
                    setCheckInBtn={setCheckInBtn}
                />
            }

            {isFullViewImgVisible && <ImageView
                images={fullViewImg}
                imageIndex={0}
                visible={isFullViewImgVisible}
                onRequestClose={() => updateState({ isFullViewImgVisible: false })}
            />}
        </SafeAreaView>
    );
};

export default CheckInUnavaibleMap;

