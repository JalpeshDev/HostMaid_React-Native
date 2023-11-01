import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../utils/colors';
import Responsive from '../../../utils/Responsive';

export const style = StyleSheet.create({
    headerContainer: {
        backgroundColor: colors.themeGreen,
        top: 0,
        position: 'relative'
        // borderBottomRightRadius: Responsive.hp(2),
        // borderBottomLeftRadius: Responsive.hp(2)
    }
});