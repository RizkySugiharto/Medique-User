import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  Image,
} from 'react-native';
import Colors  from '../styles/colors';
import { MethodPayment } from '../types';
import SessionStorage from 'react-native-session-storage';
import Modal from 'react-native-modal';
import { ShadowedView, shadowStyle } from 'react-native-fast-shadow';

function MethodPaymentSelector(): React.JSX.Element {
  const methods: MethodPayment[] = ['Gopay', 'Shopee Pay', 'Dana', 'BCA', 'BRI', 'BNI']
  const [ selected, setSelected ] = useState(SessionStorage.getItem('@selected_payment_method') | 0)
  const [ visible, setVisible ] = useState(false);

  return (
    <>
    <Modal
      animationIn='slideInUp'
      animationOut='slideOutDown'
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      isVisible={visible}>
        <ShadowedView
          style={shadowStyle({
            opacity: 1,
            offset: [0, 4],
            radius: 20,
            color: 'rgba(0, 0, 0, 0.25)',
          })}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Pilih metode pembayaran</Text>
            <FlatList
              data={methods}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => {
                    SessionStorage.setItem('@selected_payment_method', index)
                    setSelected(index)
                  }}
                  activeOpacity={0.5}>
                  <Text style={[
                    styles.payment,
                    item == methods[selected] && { backgroundColor: Colors.primaryShadow }
                  ]}>{item}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={{
                borderColor: Colors.textColorSecondary,
                borderTopWidth: 1,
                borderBottomWidth: 1,
                paddingVertical: 16,
              }} />
              <TouchableOpacity
                onPress={() => setVisible(false)}
                activeOpacity={0.6}
                style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
                <Text style={styles.selectPayment}>Pilih</Text>
              </TouchableOpacity>
          </View>
        </ShadowedView>
    </Modal>
    <TouchableOpacity
      onPress={() => setVisible(true)}
      activeOpacity={0.7}
      style={styles.button}>
      <Text style={styles.label}>{methods[selected]}</Text>
      <Image style={styles.icon} source={require('../assets/img/ic_back_arrow.png')}/>
    </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Manrope-SemiBold',
    color: Colors.textColor,
    flexShrink: 1,
  },
  icon: {
    width: 26,
    height: 26,
    transform: [{ scaleX: -1 }]
  },
  modal: {
    borderColor: Colors.textColorSecondary,
    borderWidth: 1,
    borderRadius: 14,
    backgroundColor: Colors.secondary,
  },
  modalTitle: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 18,
    color: 'rgb(0, 0, 0)',
    paddingVertical: 16,
    paddingHorizontal: 20,
    includeFontPadding: false,
  },
  payment: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: 'rgb(0, 0, 0)',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  selectPayment: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    textAlign: 'center',
    color: Colors.primary,
  }
});

export default MethodPaymentSelector;