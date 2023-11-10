import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Color from "./colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import responsive from './Responsive';
export default {

  sideMenuIcon: (
    <Feather name="menu" size={responsive.hp(3)} color={Color.black} />
  ),
  nextIcon: (
    <Ionicons name="arrow-forward-outline" size={responsive.hp(3)} color={Color.white} />
  ),
  eyeIcon: (
    <Ionicons name="eye-outline" size={responsive.hp(3)} color={Color.black} />
  ),
  eyeOffIcon: (
    <Ionicons name="eye-off-outline" size={responsive.hp(3)} color={Color.black} />
  ),
  rightTickIcon: (
    <Octicons name="check-circle-fill" size={responsive.hp(2.5)} color={Color.black} />
  ),
  checkImg: (
    <Ionicons name="checkbox" size={responsive.hp(2.5)} color={Color.themeGreen} />
  ),
  checkOutLineImg: (
    <MaterialCommunityIcons name="checkbox-blank-outline" size={responsive.hp(2.5)} color={Color.themeGreen} />
  ),
  cancel: (
    <MaterialIcons name='cancel' size={responsive.hp(2.8)} color={Color.themeTextBlack} />
  )
};
