import React, { useRef, useState, useEffect } from 'react';
import { Button, Dimensions, PermissionsAndroid, SafeAreaView, StyleSheet, Text, View, Alert, Platform, } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import viewModel from './viewModel';
import colors from '../../../utils/colors';
import Responsive from '../../../utils/Responsive';
import { style } from './style';
import { AppThemeHeaderComponent } from '../../../components/AppThemeHeaderComponent';
import { images } from '../../../utils/images';
import MapAddressCmp from '../../../components/MapAddressCmp';
import { ThemeButtonComponent } from '../../../components/ThemeButtonComponent';
import navigationServices from '../../../navigator/navigationServices';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const CheckInUnavaibleMap = () => {
    const { onChange, coordinates, latitude, longitude, } = viewModel()

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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{ flex: 2 }}
                region={{
                    latitude: coordinates[0].latitude,
                    longitude: coordinates[0].longitude,
                    latitudeDelta: 0.0622,
                    longitudeDelta: 0.0121,
                }}
            >
                <Marker coordinate={coordinates[0]} />
                <Marker coordinate={coordinates[1]} />
                <Polyline
                    coordinates={coordinates}
                    strokeColor="#bf8221"
                    strokeColors={['#7F0000']}
                    strokeWidth={6}
                />
            </MapView>
            <View style={style.MapDownView}>
                <View style={style.btnContainer} />
                <AppThemeHeaderComponent onPressRight={() => { }} onPressRightLeft={() => { }}
                    LeftIcon={images.callImg}
                    RightIcon={images.messageImg}
                />
                <MapAddressCmp icon={images.locationImg} />
                <View style={style.bottomContainer}>
                    <ThemeButtonComponent title={"Check In"}
                        isActive={false}
                        buttonStyle={{ ...style.btn, }}
                        onPress={() => {
                            navigationServices.navigateToNext("CodeScreen", {})
                        }}
                        onValidation={() => {
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default CheckInUnavaibleMap;

