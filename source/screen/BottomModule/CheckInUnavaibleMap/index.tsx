import React, { useState, useEffect } from 'react';
import { Dimensions, SafeAreaView, View, Image, TouchableOpacity, Linking, StatusBar } from 'react-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import viewModel from './viewModel';
import colors from '../../../utils/colors';
import Responsive from '../../../utils/Responsive';
import { style } from './style';
import { images } from '../../../utils/images';
import MapAddressCmp from '../../../components/MapAddressCmp';
import { ThemeButtonComponent } from '../../../components/ThemeButtonComponent';
import navigationServices from '../../../navigator/navigationServices';
import { elapsedTimes, enableTabNavigation, uploadImgEnable } from '../../../redux/slices/authSlice';
import { Strings } from '../../../utils/strings';
import { NavigationHeader } from '../../../components/AppThemeHeaderComponent/navigationHeader';
import ImageView from 'react-native-image-viewing'
import InfoPopUp from '../../../components/PopUp/InfoPopUp';
import Carousel from "react-native-snap-carousel";
import TimerCmp from '../../../components/TimerCmp';
import { useAppDispatch, useAppSelector } from '../../../redux';
import { localStorage } from '../../../utils/localStorageProvider';
import AppThemeHeaderComponent from '../../../components/AppThemeHeaderComponent';
import RenderImgSlider from '../../../components/ListCmp/RenderImgSlider';
import PlatformType from '../../../utils/PlatformType';
import ArrowCmp from '../../../components/ArrowCmp';
import { useGetBookingByIdQuery } from '../../../redux/services/ApiQuery';
import Loader from '../../../components/Loader';
import { getCurrentLocation, locationPermission } from '../../../utils/HelperFunction';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPKEY } from '../../../../env';
import icons from '../../../utils/icons';
import { getBookingDetailsAction } from '../../../redux/action/authAction';
import Geolocation from 'react-native-geolocation-service';


export const SLIDER_WIDTH = Dimensions.get('window').width + 30;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const CheckInUnavaibleMap = ({ route }: any) => {

    const routeData = route.params.routeData;
    const { loading, bookingDetails } = useAppSelector((state: any) => state.bookingReducer);

    const [isOpen, setIsOpen] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(0);
    const dispatch = useAppDispatch();
    useEffect(() => {
        createAList();
        getLiveLocation();
        // dispatch(getBookingDetailsAction(routeData?.property_id))
    }, [])

    const {
        state, updateState, checkInBtnText, createAList, callNumber,
        isCarousel, onScrollLeft, onScrollRight, isLeftArrowDisabled,
        isRightArrowDisabled, fullViewImg, isClickable, onMarkerPress,
        markerRef, mapRef
    } = viewModel()

    const {
        isFullViewImgVisible, isInfoPopup, isShowHome, isImgScroll, isTimer, slideImgdata,
        isRunning, index, checkInBtn, curLoc, time, distance, destinationCords, coordinate, heading
    } = state;

    const renderImageSlider = ({ item }: any) => {
        return (
            <RenderImgSlider checkInBtnText={checkInBtnText} item={item}
                onCheckBoxPress={(CheckListIndex: any, id: any) => {
                    const tempArry = [...slideImgdata];
                    const newArray = tempArry.map((element: any, index: number) => {
                        if (index === id) {
                            const newCheckListArray = element?.checkList.map((item: any, index: number) => ({
                                ...item,
                                isCheck: CheckListIndex === index ? !item.isCheck : item.isCheck
                            }));
                            return {
                                ...element,
                                checkList: newCheckListArray,
                            };
                        } else { }
                        return element;
                    });
                    updateState({ slideImgdata: newArray });
                }}
            />
        );
    };

    useEffect(() => {
        const loadElapsedTime = async () => {
            try {
                const savedTimeData = await localStorage.getItemObject(`property_id${routeData?.property_id}`);

                if (savedTimeData) {
                    const startTime = parseInt(savedTimeData.startTime, 10);
                    const now = Date.now();
                    const elapsed = now - startTime;

                    setElapsedTime(elapsed + parseInt(savedTimeData.elapsedTime, 10));

                    updateState({ isImgScroll: true })
                    updateState({ isTimer: true })
                    updateState({ checkInBtn: 2 })
                    updateState({ isRunning: true })
                    dispatch(enableTabNavigation())

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

    const animate = (latitude: any, longitude: any) => {
        const newCoordinate: any = { latitude, longitude };
        if (PlatformType.android) {
            if (markerRef.current) {
                markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
            }
        } else {
            coordinate.timing(newCoordinate).start();
        }
    }
    const getLiveLocation = async () => {
        const locPermissionDenied = await locationPermission()
        if (locPermissionDenied) {
            const { latitude, longitude, heading } = await getCurrentLocation()
            animate(latitude, longitude);
            updateState({
                heading: heading,
                curLoc: { latitude, longitude },
                coordinate: new AnimatedRegion({
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                })
            })
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getLiveLocation()
        }, 3000);
        return () => clearInterval(interval)
    }, [])
    // const fetchTime = (d: number, t: number) => {
    //     updateState({
    //         distance: d,
    //         time: t
    //     })
    //     if (d < 0.021) {
    //         dispatch(uploadImgEnable());
    //     } else { }
    // }
    return (
        <SafeAreaView style={style.mainView}>
            <StatusBar
                animated
                translucent={false}
                backgroundColor={PlatformType.android ? colors.themeGreen : colors.MapDownColor}
            />
            <NavigationHeader LeftIcon={images.backIcon} RightIcon={images.Info} checkInBtn={checkInBtn} isTimer={isTimer}
                onPressLeft={() => navigationServices.navigationGoBack()} onPressRight={() => updateState({ isInfoPopup: !isInfoPopup })} />
            <Loader loading={loading} />
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
                                sliderWidth={PlatformType.android ? Responsive.hp(36) : Responsive.hp(34)}
                                itemWidth={PlatformType.android ? Responsive.hp(36) : Responsive.hp(34)}
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
                    style={style.mapView}
                    region={{
                        ...curLoc,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                >
                    <Marker.Animated coordinate={coordinate} ref={markerRef}>
                        <View style={style.lightGreenRing}>
                            <View style={style.greyRing}>
                                <View style={style.sourceIconStyle}>
                                    <Image source={images.SourceAvtar} style={style.markerStyle} resizeMode='contain' />
                                </View>
                            </View>
                        </View>
                    </Marker.Animated>
                    <Marker.Animated coordinate={destinationCords}
                        onPress={() => onMarkerPress()}
                    >
                        <TouchableOpacity style={style.markerInsideView} >
                            {isShowHome &&
                                <TouchableOpacity>
                                    <Image source={images.CircleHouse}
                                        style={style.homeImages} />
                                </TouchableOpacity>
                            }
                            <TouchableOpacity style={style.destinationIconStyle}>
                                <Image source={images.HomeDestination} style={style.markerStyle} resizeMode='contain' />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </Marker.Animated>
                    <MapViewDirections
                        origin={curLoc}
                        destination={destinationCords}
                        apikey={GOOGLE_MAPKEY}
                        strokeWidth={4}
                        strokeColor={colors.directionLine}
                        strokeColors={[colors.directionLine]}
                        optimizeWaypoints={true}
                        onReady={result => {
                            console.log(`Distance: ${result.distance} km`)
                            console.log(`Duration: ${result.duration} min.`)
                            // fetchTime(result?.distance, result?.duration)
                            // mapRef.current.fitToCoordinates(result.coordinates, {
                            //     edgePadding: {
                            //         right: 30,
                            //         bottom: 300,
                            //         left: 30,
                            //         top: 100,
                            //     },
                            // });
                        }}

                    />
                    {/* <Polyline
                        coordinates={coordinates}
                        strokeColor={colors.themeGreen}
                        strokeColors={['#7F0000']}
                        strokeWidth={6}
                    /> */}
                </MapView>
            }
            <View style={{ ...style.MapDownView, height: isOpen ? Responsive.hp(35) : Responsive.hp(3.5) }}>
                <TouchableOpacity onPress={() => { setIsOpen(!isOpen) }} >
                    <View style={style.btnContainer} />
                </TouchableOpacity>
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
            {
                isInfoPopup &&
                <InfoPopUp isInfoPopup={isInfoPopup} updateState={updateState}
                    timer={isTimer} isImgScroll={isImgScroll} checkInBtn={checkInBtn}
                    startTimer={startTimer} property_id={routeData?.property_id}
                />
            }

            {
                isFullViewImgVisible && <ImageView
                    images={fullViewImg}
                    imageIndex={0}
                    visible={isFullViewImgVisible}
                    onRequestClose={() => updateState({ isFullViewImgVisible: false })}
                />
            }
        </SafeAreaView >
    );
};

export default CheckInUnavaibleMap;

