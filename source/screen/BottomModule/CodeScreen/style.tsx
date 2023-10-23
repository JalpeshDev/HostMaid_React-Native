import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../utils/colors';
import Responsive from '../../../utils/Responsive';

export const style = StyleSheet.create({
    mainView: { flex: 1 },
    headerContainer: {
        backgroundColor: colors.themeGreen,
        top: 0,
        borderBottomRightRadius: Responsive.hp(2),
        borderBottomLeftRadius: Responsive.hp(2)
    }
});