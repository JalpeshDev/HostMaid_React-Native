import { useState } from 'react';
const DATA = [
    {
        title: 'Notes',
        notes: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500sLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing.`
    },
];
export default function viewModel() {
    const [state, setState] = useState<any>({
        addNotes: "",
        imagePickerVisiable: "",
        deviceImages: null,
        isEditBtnVisiable: false,
        isFullImgViewer: false,
        selectimageindex: 0
    });

    const updateState = (data: any) => setState((state: any) => ({ ...state, ...data }));

    const onLongPressToDelete = (selectedImg: any) => {
        let tempArry = [...state.deviceImages]
        tempArry[selectedImg.index].isDelete = !selectedImg?.item?.isDelete
        updateState({ deviceImages: tempArry })
    }

    const onDeletePress = (selectedImg: any) => {
        let tempArry = [...state.deviceImages]
        var filterData = tempArry.filter((data, index) => index != selectedImg?.index);
        updateState({ deviceImages: filterData })
    }

    const onFullViewerImg = (selectedImg: any) => {
        updateState({ isFullImgViewer: !state.isFullImgViewer })
        for (let index = 0; index < state.deviceImages?.length; index++) {
            if (index === selectedImg?.index) {
                updateState({ selectimageindex: index })
            } else { }
        }
    }

    return {
        state,
        DATA,
        updateState,
        onLongPressToDelete,
        onDeletePress,
        onFullViewerImg
    };
}
