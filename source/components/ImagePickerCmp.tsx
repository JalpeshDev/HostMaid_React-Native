import {
    StyleSheet,
    View,
    Modal,
    TouchableOpacity,
    Linking,
} from 'react-native';
import React, { useState, FC } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import { AlertPopUp } from '../utils/generalFunction';
import { Strings } from '../utils/strings';
import Responsive from '../utils/Responsive';
import colors from '../utils/colors';
import { ThemeButtonComponent } from './ThemeButtonComponent';
import { GlobalStyle } from '../utils/GlobalStyle';
import PlatformType from '../utils/PlatformType';


const ImagePickerCmp = ({
    visible, updateState, deviceImages
}: any) => {

    const [modalvisible, setModelVisible] = useState<boolean>(visible);
    const openGalley = () => {
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true,
            multiple: true,
            mediaType: 'photo',
            compressImageQuality: 0.5,
        })
            .then((res: any) => {
                if (res.didCancel) {
                    updateState({ deviceImages: null })
                } else {
                    res.forEach((element: any) => {
                        element["isDelete"] = false
                        element["uri"] = element?.path
                    });
                    updateState({ imagePickerVisiable: !visible })
                    if (deviceImages != null) {
                        const mergedArray = deviceImages.concat(res);
                        updateState({ deviceImages: mergedArray })
                    } else {
                        updateState({ deviceImages: res })
                    }
                }
            })
            .catch(err => {
                if (err.code === 'E_NO_LIBRARY_PERMISSION') {
                    createTwoButtonAlert();
                }
            });
    };
    const openCamera = () => {
        let arr: any[] = []
        ImagePicker.openCamera({
            width: 400,
            height: 400,
            mediaType: 'photo',
            cropping: true,
            compressImageQuality: 0.5,
        })
            .then((res: any) => {
                arr.push(res)
                if (res?.didCancel) {
                    updateState({ deviceImages: '' })
                } else {
                    arr.forEach((element: any) => {
                        element["isDelete"] = false
                        element["uri"] = element?.path
                    });
                    updateState({ imagePickerVisiable: !visible })
                    if (deviceImages != null) {
                        const mergedArray = deviceImages.concat(arr);
                        updateState({ deviceImages: mergedArray })
                    } else {
                        updateState({ deviceImages: arr })
                    }
                }
            })
            .catch(err => {
                if (err.code === 'E_NO_CAMERA_PERMISSION') {
                    createTwoButtonAlert();
                } else {
                    console.log("err-->", err);
                }
            });
    };
    const createTwoButtonAlert = () => {
        AlertPopUp({
            title: `${Strings.ImagePickerPermissionTitle}`, message: `${Strings.ImagePickerPermissionMsg}`,
            btn: `${Strings.Setting}`,
            btnPresed: () => { Linking.openSettings() }
        })
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalvisible}
            onRequestClose={() => {
                setModelVisible(!modalvisible)
                updateState({ imagePickerVisiable: !visible })
            }}>
            <TouchableOpacity
                onPress={() => {
                    setModelVisible(!modalvisible)
                    updateState({ imagePickerVisiable: !visible })
                }}
                style={styles.modalContainer}>
                <View style={styles.subContainer}>
                    <ThemeButtonComponent
                        title={Strings.Gallery}
                        buttonStyle={{ ...styles.btn }}
                        textStyle={{ ...styles.btnTitle }}
                        onPress={() => { openGalley() }}
                    />
                    <ThemeButtonComponent
                        title={Strings.Camera}
                        buttonStyle={{ ...styles.btn }}
                        textStyle={{ ...styles.btnTitle }}
                        onPress={() => { openCamera() }}
                    />
                </View>
            </TouchableOpacity>
        </Modal>
    );
};
export default ImagePickerCmp;
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#00000020',
    },
    button: {
        width: Responsive.wp(85),
        height: Responsive.wp(15),
        borderRadius: Responsive.wp(8),
        backgroundColor: colors.black,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subContainer: {
        padding: Responsive.hp(4),
        backgroundColor: colors.bedList,
        borderTopLeftRadius: Responsive.wp(5),
        borderTopRightRadius: Responsive.wp(5),
        width: '100%',
        alignItems: 'center',
    },
    btnTextstyle: {
        color: colors.white,
        fontSize: Responsive.wp(5),
        fontWeight: '600',
    },
    btn: {
        width: "60%",
        borderRadius: Responsive.hp(5),
        height: Responsive.hp(6),
        alignSelf: 'center',
        marginBottom: Responsive.hp(1),
        backgroundColor: colors.themeTextBlack,
        shadowOffset: { width: 0.2, height: 0.2 },
        shadowColor: colors.themeTextBlack,
        shadowRadius: 1,
        shadowOpacity: 0.1,
        elevation: 4
    },
    btnTitle: {
        ...GlobalStyle.Fonts_B_15,
        fontSize: PlatformType.android ? Responsive.hp(1.9) : Responsive.hp(1.5)
    },
});
