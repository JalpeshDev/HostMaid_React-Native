import { StyleSheet, Dimensions } from 'react-native';
import Responsive from '../../../utils/Responsive';
import colors from '../../../utils/colors';
const screen = Dimensions.get('window');
export const style = StyleSheet.create({
    mainView: { flex: 1 },
    text: {
        fontSize: 20,
        backgroundColor: "lightblue",
    },
    maps: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
    },
    MapDownView: {
        flex: 1, backgroundColor: colors.MapDownColor,
        borderTopLeftRadius: Responsive.hp(4),
        borderTopRightRadius: Responsive.hp(4),
        borderWidth: 1,
        borderColor: colors.MapDownColor,
        paddingBottom: 10
    },
    btnContainer: {
        width: Responsive.wp(20),
        backgroundColor: colors.MapHeadLine,
        borderRadius: Responsive.hp(1),
        height: Responsive.hp(0.5),
        marginTop: Responsive.hp(0.8),
        alignSelf: 'center',
        marginBottom: Responsive.hp(2)
    },
    bottomContainer: {
        justifyContent: "center",
        width: "100%", alignItems: "center",
        paddingBottom: Responsive.hp(1.5),
        marginTop: Responsive.hp(5)
    },
    btn: { marginVertical: Responsive.hp(1), width: "90%" },
    sourceIconStyle: { height: Responsive.hp(4), width: Responsive.wp(8) },
    destinationIconStyle: { height: Responsive.hp(6), width: Responsive.wp(8), },
    markerStyle: { height: '100%', width: '100%' }
});