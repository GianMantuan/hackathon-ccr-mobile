import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import Modal from 'react-native-modal';

const {height} = Dimensions.get('screen');

export default function ModalView({visible, item, setVisible, children}) {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => setVisible(false)}
      onBackButtonPress={() => setVisible(false)}
      hideModalContentWhileAnimating
      style={styles.ModalStyle}
      animationOutTiming={500}>
      <View style={styles.Container}>
        <View style={styles.Content}>{children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  ModalStyle: {
    justifyContent: 'flex-end',
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    height: '70%',
  },
  Container: {
    height: height / 1.5,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: '#FFFF',
  },
  Content: {
    margin: 20,
  },
  Details: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Item: {
    marginTop: 20,
    alignContent: 'center',
    flexDirection: 'column',
  },
  ItemText: {
    textAlign: 'center',
  },
  Title: {
    marginVertical: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 28,
    color: '#121212',
  },
  Text: {
    fontSize: 18,
    fontWeight: '300',
  },
});
