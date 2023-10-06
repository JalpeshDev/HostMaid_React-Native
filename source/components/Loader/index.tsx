import React, { FC, memo, useState } from 'react';
import { View, Modal, ActivityIndicator, StyleSheet } from 'react-native';
import colors from '../../utils/colors';

const Loader = (props: any) => {
  const { loading } = props;
  const [state, setState] = useState({ status: true });
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={state.status ? loading : state.status}
      onRequestClose={() => {
        setState({ status: false });
      }}>
      <View style={[styles.centeredView]}>
        <View style={styles.modalView}>
          <ActivityIndicator
            size="large"
            color={colors.themeGreen}
            animating={loading}
          />
        </View>
      </View>
    </Modal>
  );
};
export default memo(Loader);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: "#00000090",
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.MapDownColor,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
