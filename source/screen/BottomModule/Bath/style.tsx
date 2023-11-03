import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors';
import Responsive from '../../../utils/Responsive';

export const style = StyleSheet.create({
    headerContainer: {
        backgroundColor: colors.themeGreen,
        top: 0,
        position: 'relative',
        alignItems: "flex-end"
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