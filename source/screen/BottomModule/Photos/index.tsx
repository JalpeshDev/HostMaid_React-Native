import { Text, View, StatusBar, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { GlobalStyle } from '../../../utils/GlobalStyle'
import PlatformType from '../../../utils/PlatformType';
import { useAppSelector } from '../../../redux';
import colors from '../../../utils/colors';
import { Strings } from '../../../utils/strings';
import { NavigationHeader } from '../../../components/AppThemeHeaderComponent/navigationHeader';
import viewModel from './viewModel';
import NotesListCmp from '../../../components/ListCmp/NotesListCmp';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { style } from './style';
import { ThemeButtonComponent } from '../../../components/ThemeButtonComponent';
import { images } from '../../../utils/images';
import DisplayImageList from '../../../components/ListCmp/DisplayImageList';
import ImagePickerCmp from '../../../components/ImagePickerCmp';
import ImageView from "react-native-image-viewing";

const Photos = () => {
    const { elapsed, uploadImgStatus } = useAppSelector((state) => state.authReducer);
    const {
        DATA, updateState, state, onLongPressToDelete,
        onDeletePress,
        onFullViewerImg } = viewModel();
    const { addNotes, imagePickerVisiable, deviceImages, isEditBtnVisiable, isFullImgViewer, selectimageindex } = state;

    const renderItem = (item: any) => {
        return (
            <DisplayImageList item={item} onLongPressToDelete={onLongPressToDelete}
                onDeletePress={onDeletePress} onFullViewerImg={onFullViewerImg}
            />
        )
    }



    return (
        <View style={GlobalStyle.mainContainer}>
            <KeyboardAwareScrollView>
                {PlatformType.android &&
                    <StatusBar
                        animated
                        translucent={false}
                        backgroundColor={colors.themeGreen}
                    />
                }
                {imagePickerVisiable && (
                    <ImagePickerCmp
                        visible={imagePickerVisiable}
                        updateState={updateState}
                        deviceImages={deviceImages}
                    />
                )}
                <NavigationHeader
                    isTitle={true}
                    containerStyle={style.headerContainer}
                    leftTitle={Strings.NotesPhotos}
                    elapsedTime={elapsed}
                />
                <View style={{ flex: 1 }}>
                    <NotesListCmp title={Strings.Notes}
                        onTextChange={(text: any) => { updateState({ addNotes: text }) }}
                        isBtnEnable={addNotes?.length > 0}
                        isEditBtnVisiable={isEditBtnVisiable}
                        editable={true}
                        notes={addNotes}
                        onSavePress={() => {
                            updateState({ isEditBtnVisiable: true })
                        }}
                        onEditPress={() => {
                            updateState({ isEditBtnVisiable: false })
                        }}
                    />
                </View>
                {deviceImages != null ?
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={deviceImages}
                            showsVerticalScrollIndicator={false}
                            numColumns={3}
                            renderItem={renderItem}
                            contentContainerStyle={style.listContainer}
                            style={style.flatlistContainer}
                        />
                    </View>
                    :
                    <View style={style.boxStyle}>
                        <ThemeButtonComponent
                            isImage={images.Upload}
                            buttonStyle={{ ...style.btn }}
                            onPress={() => {
                                updateState({ imagePickerVisiable: true })
                            }}
                        />
                        <Text style={style.uploadText}>{Strings.UploadText}</Text>
                    </View>
                }

            </KeyboardAwareScrollView>
            {deviceImages != null &&
                <View style={style.addPhotos}>
                    <ThemeButtonComponent
                        title={Strings.AddPhotos}
                        isImage={images.Upload}
                        buttonStyle={{ ...style.addPhotosBtn }}
                        textStyle={{ ...style.uploadText, color: colors.white }}
                        onPress={() => {
                            updateState({ imagePickerVisiable: true })
                        }}
                    />
                </View>
            }
            {isFullImgViewer && <ImageView
                images={deviceImages}
                imageIndex={selectimageindex}
                visible={isFullImgViewer}
                onRequestClose={() => updateState({ isFullImgViewer: false })}
            />}
        </View>
    );
}

export default Photos

