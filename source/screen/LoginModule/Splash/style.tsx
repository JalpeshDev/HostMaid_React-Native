import { StyleSheet } from 'react-native';
import Responsive from '../../../utils/Responsive';
export const style = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageBGContainer: { width: "100%", height: "100%", justifyContent: "center" },
    imageLogoContainer: { width: Responsive.wp(76), height: Responsive.hp(6), alignSelf: "center" },
});
