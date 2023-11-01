import {
    StyleSheet,
    View,
    Modal,
    TouchableOpacity,
    Text, Image
} from 'react-native';
import React from 'react';
import Responsive from '../../utils/Responsive';
import colors from '../../utils/colors';
import { ThemeButtonComponent } from '../ThemeButtonComponent';
import { GlobalStyle } from '../../utils/GlobalStyle';
import { Strings } from '../../utils/strings';
import { images } from '../../utils/images';
import { localStorage } from '../../utils/localStorageProvider';
const textInfo = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries

Lorem Ipsum is simply dummy text of the printing and typesetting industry.`

const InfoPopUp = ({
    isInfoPopup, updateState, isImage, isImagePop,
    checkInBtn, startTimer, property_id
}: any) => {
    const onPressOkay = async () => {
        try {
            updateState({ isInfoPopup: !isInfoPopup });
            updateState({ isTimer: true });
            updateState({ isImgScroll: true });
            if (checkInBtn == 1) {
                updateState({ checkInBtn: checkInBtn + 1 })
            } else { }
            const savedTimeData = await localStorage.getItemObject(`property_id${property_id}`)
            if (savedTimeData == undefined || savedTimeData == null) {
                startTimer()
            } else { }
        } catch (error) {
            console.error('Error loading elapsed time: ', error);
        }

    }
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isInfoPopup}
            onRequestClose={() => {
                if (isImage) {
                    updateState({ isImagePop: !isImagePop })
                } else {
                    updateState({ isInfoPopup: !isInfoPopup })
                }
            }}>
            {isImage ?
                <TouchableOpacity
                    onPress={() => updateState({ isImagePop: !isImagePop })} style={{ ...style.modalContainer, justifyContent: 'flex-start' }}>
                    <View style={style.imgSubContainer}>
                        <Image source={images.House} style={{ height: Responsive.hp(44), width: Responsive.hp(44) }} resizeMode='cover' />
                    </View>
                </TouchableOpacity>
                :
                <View
                    style={style.modalContainer}>
                    <View style={style.subContainer}>
                        <View style={style.containerLine} />
                        <View style={{ paddingHorizontal: 10, }}>
                            <Text style={style.decription}>{textInfo}</Text>
                        </View>
                        <View style={style.bottomContainer}>
                            <ThemeButtonComponent title={Strings.Okay}
                                isActive={false}
                                onPress={() => { onPressOkay() }}
                                buttonStyle={{ ...style.btn, }}
                                textStyle={{ ...style.btnTitle }}
                                onValidation={() => {
                                }}
                            />
                        </View>
                    </View>
                </View>
            }
        </Modal>
    );
};
export default InfoPopUp;
const style = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000020',
        paddingTop: Responsive.hp(9),
    },
    subContainer: {
        paddingTop: Responsive.hp(2),
        paddingBottom: Responsive.hp(5),
        backgroundColor: "#F2F0F6",
        borderTopLeftRadius: Responsive.wp(7),
        borderTopRightRadius: Responsive.wp(7),
        width: '100%',
        alignItems: 'center',
        flex: 1
    },
    imgSubContainer: {
        paddingTop: Responsive.hp(2),
        paddingBottom: Responsive.hp(5),
        // backgroundColor: "#F2F0F6",
        borderRadius: Responsive.hp(2),
        width: '100%',
        alignItems: 'center',
        height: Responsive.hp(45),

        // flex: 1
    },
    bottomContainer: {
        justifyContent: "center",
        width: "100%", alignItems: "center",
        position: 'absolute', bottom: 1, marginBottom: Responsive.hp(8)
    },
    btn: { marginVertical: Responsive.hp(1), width: "90%", backgroundColor: colors.headerTitleColor },
    btnTitle: { ...GlobalStyle.Fonts_B_15 },
    containerLine: {
        width: Responsive.wp(20),
        backgroundColor: colors.MapHeadLine,
        borderRadius: Responsive.hp(1),
        height: Responsive.hp(0.5),
        alignSelf: 'center',
        marginBottom: Responsive.hp(2)
    },
    decription: {
        textAlignVertical: 'center',
        ...GlobalStyle.Fonts_M_15,
        color: colors.locationText,
    }
});
