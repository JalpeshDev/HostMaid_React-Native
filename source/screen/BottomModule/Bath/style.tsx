import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../utils/colors';
import Responsive from '../../../utils/Responsive';

export const style = StyleSheet.create({
    headerContainer: {
        backgroundColor: colors.bedList,
        top: 0,
        position: 'relative'
    },
    listContainer: {
        width: "92%",
        alignSelf: "center",
        marginTop: Responsive.hp(1),
        marginBottom: Responsive.hp(0.5),
    },
    listInContainer: {
        borderRadius: Responsive.hp(2), paddingTop: Responsive.hp(1),
    },
});