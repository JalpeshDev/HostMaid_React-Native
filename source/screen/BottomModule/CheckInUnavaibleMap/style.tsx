import { StyleSheet, Dimensions } from 'react-native';
import Responsive from '../../../utils/Responsive';
import colors from '../../../utils/colors';
import { GlobalStyle } from '../../../utils/GlobalStyle';
const screen = Dimensions.get('window');
export const style = StyleSheet.create({
    mainView: { flex: 1 },
    mapView: {
        height: Responsive.hp(62)
    },
    text: {
        fontSize: 20,
        backgroundColor: "lightblue",
    },
    maps: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
    },
    MapDownView: {
        flex: 1,
        backgroundColor: colors.MapDownColor,
        borderTopLeftRadius: Responsive.hp(3),
        borderTopRightRadius: Responsive.hp(3),
        borderWidth: 1,
        borderColor: colors.mapBottomBorder,
        paddingBottom: 10,
        position: 'absolute', bottom: 0, alignSelf: 'center', width: '100%',
        height: Responsive.hp(35),
        elevation: 1,
        shadowOffset: { width: 0.2, height: 0.2 },
        shadowColor: colors.black,
        shadowRadius: 1,
        shadowOpacity: 0.1,
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
    },
    btn: { width: "90%" },
    sourceIconStyle: {
        height: Responsive.hp(4), width: Responsive.hp(4),
        backgroundColor: colors.white, borderRadius: Responsive.hp(5)
    },
    destinationIconStyle: { height: Responsive.hp(6), width: Responsive.hp(6) },
    markerStyle: { height: '100%', width: '100%' },
    greyRing: {
        backgroundColor: colors.themeGrayLight, height: Responsive.hp(5), width: Responsive.hp(5),
        justifyContent: 'center', alignItems: 'center', borderRadius: Responsive.hp(5)
    },
    lightGreenRing: {
        backgroundColor: colors.themeGreenLight,
        height: Responsive.hp(8), width: Responsive.hp(8),
        justifyContent: 'center', alignItems: 'center', borderRadius: Responsive.hp(5),
        elevation: 5,
    },
    homeImages: { width: Responsive.hp(17), height: Responsive.hp(17), resizeMode: 'contain' },
    backgroundSlider: {
        elevation: 5,
        shadowOffset: { width: 0.2, height: 0.2 },
        shadowColor: colors.whiteGrey60,
        shadowRadius: 1,
        shadowOpacity: 0.1,
        paddingBottom: Responsive.hp(8),
        borderRadius: Responsive.hp(1.5),
        width: "100%",
    },
    imageSlider: {
        height: "100%",
        width: "100%",
        borderRadius: Responsive.hp(1.5), resizeMode: 'contain',
    },
    imgContainer: { marginTop: Responsive.hp(10), flexDirection: "row" },
    arrowContainer: { justifyContent: 'center', width: "15%", alignItems: 'center', },
    containerPagging: {
        position: "absolute",
        bottom: 0,
        alignSelf: "center",
    },
    dotContainerPagging: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.themeGreen,
    },

    timerContainer: { height: Responsive.hp(8), justifyContent: 'center', alignItems: 'center' },
    CarouselStyle: {
        height: Responsive.hp(46), width: "70%",
        borderRadius: Responsive.hp(1.5), alignItems: 'center',
    },
    markerInsideView: { justifyContent: 'center', alignItems: 'center' },
    containerTextSlider: {
        position: "absolute",
        bottom: 0,
        height: Responsive.hp(8),
        width: '100%',
        borderRadius: Responsive.hp(1.5),
        flexDirection: 'row',
        justifyContent: 'center', alignItems: 'center',
    },
    sliderBottomText: {
        color: colors.headerTitleColor,
        ...GlobalStyle.Fonts_M_15,
        textAlign: 'left',
        flex: 1
    },
    itemCheckView: { paddingRight: Responsive.hp(1.2), },
    itemCheckImg: { width: Responsive.hp(2.5), height: Responsive.hp(2.5), marginTop: Responsive.hp(0.5) },
});