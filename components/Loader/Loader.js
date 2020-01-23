import React, { Component } from 'react';
import { StyleSheet, View, Modal, Image } from 'react-native';

const Loader = props => {
  const {
    loading,
  } = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => { }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          {/* <ActivityIndicator
            animating={loading} /> */}
          <Image
            style={{ width: 100, height: 100 }}
            source={require('../../images/preloader.gif')}
          />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  activityIndicatorWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default Loader;