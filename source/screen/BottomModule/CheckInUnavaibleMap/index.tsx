import React, { useState, useEffect } from 'react';
import { Dimensions, PermissionsAndroid, SafeAreaView, View, Alert, Image, TouchableOpacity, Linking } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import viewModel from './viewModel';
import colors from '../../../utils/colors';
import Responsive from '../../../utils/Responsive';
import { style } from './style';
import { images } from '../../../utils/images';
import MapAddressCmp from '../../../components/MapAddressCmp';
import { ThemeButtonComponent } from '../../../components/ThemeButtonComponent';
import navigationServices from '../../../navigator/navigationServices';
import { elapsedTimes } from '../../../redux/slices/authSlice';
import { Strings } from '../../../utils/strings';
import { NavigationHeader } from '../../../components/AppThemeHeaderComponent/navigationHeader';
import ImageView from 'react-native-image-viewing'
import InfoPopUp from '../../../components/PopUp/InfoPopUp';
import Carousel from "react-native-snap-carousel";
import TimerCmp from '../../../components/TimerCmp';
import { useAppDispatch } from '../../../redux';
import { localStorage } from '../../../utils/localStorageProvider';
import AppThemeHeaderComponent from '../../../components/AppThemeHeaderComponent';
import RenderImgSlider from '../../../components/ListCmp/RenderImgSlider';
import PlatformType from '../../../utils/PlatformType';
import ArrowCmp from '../../../components/ArrowCmp';
import { useGetBookingByIdQuery } from '../../../redux/services/ApiQuery';
import Loader from '../../../components/Loader';
import { locationPermission } from '../../../utils/HelperFunction';

export const SLIDER_WIDTH = Dimensions.get('window').width + 30;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const CheckInUnavaibleMap = ({ route }: any) => {
    const routeData = route.params.routeData;
    const { isLoading, data } = useGetBookingByIdQuery(routeData?.property_id)

    const [elapsedTime, setElapsedTime] = useState(0);
    const dispatch = useAppDispatch();
    const {
        onChange, coordinates, state, updateState, checkInBtnText, createAList, callNumber,
        isCarousel, onScrollLeft, onScrollRight, isLeftArrowDisabled,
        isRightArrowDisabled, fullViewImg, isClickable, onMarkerPress
    } = viewModel()

    const {
        isFullViewImgVisible, isInfoPopup, isShowHome, isImgScroll, isTimer, slideImgdata,
        isRunning, index, checkInBtn
    } = state;

    useEffect(() => {
        createAList()
    }, [])

    const renderImageSlider = ({ item }: any) => {
        return (
            <RenderImgSlider checkInBtnText={checkInBtnText} item={item}
                onCheckBoxPress={(item: any) => {
                    let tempArry = [...slideImgdata]
                    tempArry[item.id - 1].isCheck = !item.isCheck
                    updateState({ slideImgdata: tempArry })
                }}
            />
        );
    };

    useEffect(() => {
        const requestLocationPermission = async () => {
            if (PlatformType.android) {
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
                const locationStation =await locationPermission()
                if (locationStation ==='granted') {
                    getLocation();
                }else{
                    
                }
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

    useEffect(() => {
        const loadElapsedTime = async () => {
            try {
                const savedTimeData = await localStorage.getItemObject(`property_id${routeData?.property_id}`);

                if (savedTimeData) {
                    const startTime = parseInt(savedTimeData.startTime, 10);
                    const timerStartingDate = savedTimeData.timerStartingDate;
                    const now = Date.now();
                    const elapsed = now - startTime;

                    setElapsedTime(elapsed + parseInt(savedTimeData.elapsedTime, 10));

                    // Calculate the time elapsed since the timer was started
                    const timeElapsedSinceStart = now - timerStartingDate;
                    updateState({ isImgScroll: true })
                    updateState({ isTimer: true })
                    updateState({ checkInBtn: 2 })
                    updateState({ isRunning: true })

                    // if (timeElapsedSinceStart >= 0 && timeElapsedSinceStart < 24 * 60 * 60 * 1000) {
                    //     await localStorage.setItemObject(`property_id${routeData?.property_id}`, {
                    //         startTime: startTime.toString(),
                    //         timerStartingDate: Date.now(),
                    //         elapsedTime: savedTimeData ? savedTimeData.elapsedTime + elapsedTime : elapsedTime,
                    //     });
                    //     // updateState({ isRunning: true })
                    // } else {
                    //     // updateState({ isRunning: false })
                    // }
                }
            } catch (error) {
                console.error('Error loading elapsed time: ', error);
            }
        };

        loadElapsedTime();
    }, [routeData]);

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                setElapsedTime(prevElapsedTime => prevElapsedTime + 1000);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [isRunning]);

    const startTimer = async () => {
        try {
            const savedTimeData = await localStorage.getItemObject(`property_id${routeData?.property_id}`);
            const startTime = Date.now() - elapsedTime;

            // Store the start time and current elapsed time
            await localStorage.setItemObject(`property_id${routeData?.property_id}`, {
                startTime: startTime.toString(),
                timerStartingDate: Date.now(),
                elapsedTime: savedTimeData ? savedTimeData.elapsedTime + elapsedTime : elapsedTime,
            });
            updateState({ isRunning: true })
        } catch (error) {
            console.error('Error starting timer: ', error);
        }
    };
    const pauseTimer = () => {
        updateState({ isRunning: false })
    };

    useEffect(() => {
        dispatch(elapsedTimes({ elapsedTime: elapsedTime }))
    }, [elapsedTime])

    return (
        <SafeAreaView style={style.mainView}>
            <NavigationHeader LeftIcon={images.backIcon} RightIcon={images.Info} checkInBtn={checkInBtn} isTimer={isTimer}
                onPressLeft={() => navigationServices.navigationGoBack()} onPressRight={() => updateState({ isInfoPopup: !isInfoPopup })} />
            <Loader loading={isLoading} />
            {isImgScroll ?
                <View style={style.mapView}>
                    <View style={style.imgContainer}>
                        <View style={style.arrowContainer}>
                            {slideImgdata.length != 0 &&
                                <ArrowCmp onPress={(index: any) => { onScrollLeft(index) }}
                                    disabled={isLeftArrowDisabled}
                                    arrowImg={images.BackArrow}
                                    index={index}
                                />
                            }
                        </View>

                        <View style={style.CarouselStyle}>
                            <Carousel
                                ref={isCarousel}
                                data={slideImgdata}
                                renderItem={renderImageSlider}
                                sliderWidth={PlatformType.android ? Responsive.hp(36):Responsive.hp(34)}
                                itemWidth={PlatformType.android ? Responsive.hp(36):Responsive.hp(34)}
                                onSnapToItem={(index) => updateState({ index: index })}
                                scrollEnabled={true}

                            />
                        </View>
                        <View style={style.arrowContainer}>
                            {slideImgdata.length != 0 &&
                                <ArrowCmp onPress={(index: any) => {
                                    onScrollRight(index)
                                }}
                                    disabled={isRightArrowDisabled}
                                    arrowImg={images.ForwordArrow}
                                    index={index}
                                />
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
                    <Marker coordinate={coordinates[0]} T={console.log("coordinates[0]-->",coordinates[0])}>
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
                    {isTimer && <TimerCmp elapsedTime={elapsedTime} />}
                </View>
                <View style={style.bottomContainer}>
                    <ThemeButtonComponent title={checkInBtn == 2 ? Strings.CheckOut : Strings.CheckIn}
                        isActive={isClickable ? true : false}
                        buttonStyle={{ ...style.btn, }}
                        textStyle={{ ...style.btnTitle }}
                        onPress={() => {
                            if (checkInBtn == 0) {
                                updateState({ checkInBtn: checkInBtn + 1 })
                            } else if (checkInBtn == 1) {
                                updateState({ isInfoPopup: !isInfoPopup })
                            } else {
                                pauseTimer()
                            }
                        }}
                        onValidation={() => {
                        }}
                        checkInBtn={checkInBtn}
                    />
                </View>
            </View>
            {isInfoPopup &&
                <InfoPopUp isInfoPopup={isInfoPopup} updateState={updateState}
                    timer={isTimer} isImgScroll={isImgScroll} checkInBtn={checkInBtn}
                    startTimer={startTimer} property_id={routeData?.property_id}
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

