import React from 'react';
import { Marker } from 'react-native-maps';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { images } from '../../utils/images';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'




export const CustomMarker = ({ coordinate, title, navigation }: any) => {


    return (
        <Marker coordinate={coordinate} >
            <View style={{ position: 'relative', height: 80, width: 80, padding: 10 }}>
                <View style={{ position: 'absolute', height: 60, width: 60 }}>
                    <Image source={images.sourceImg} style={{ resizeMode: 'contain', height: 40, width: 40 }} />
                </View>
                <View style={{ position: 'absolute', left: 7.4, top: 3 }}>
                    <Image source={images.destination} style={{ resizeMode: 'contain', height: 25, width: 25 }} />
                </View>
                <View style={{ top: 5, width: 40, position: 'absolute' }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#ffffff' }}>1</Text>
                </View>
            </View>
        </Marker>

    );
}


export const CustomMarkerUser = ({ coordinate, title, navigation }: any) => {


    return (
        <Marker coordinate={coordinate} >
            <View style={{ position: 'relative', height: 80, width: 80, padding: 10 }}>
                <View style={{ position: 'absolute', height: 60, width: 60 }}>
                    <Image source={images.sourceImg} style={{ resizeMode: 'contain', height: 40, width: 40 }} />
                </View>
                <View style={{ position: 'absolute', left: 7.4, top: 3 }}>
                    <Image source={images.destination} style={{ resizeMode: 'contain', height: 25, width: 25 }} />
                </View>
                <View style={{ top: 7, width: 40, left: 11, position: 'absolute' }}>
                    <FontAwesome5 name={'user-circle'} size={17} color="#ffffff" />
                </View>
            </View>
        </Marker>

    );
}


//export default CustomMarker;
