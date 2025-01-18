import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  useAnimatedValue,
  Animated,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Colors  from '../styles/colors';
import Button from '../components/Button';

function OrderDoctorFinishedScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const scaleAnim = useAnimatedValue(0);
  useFocusEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 30
    }).start()
  })
  
  return (
    <View style={styles.screenContainer}>
      <Animated.View
        style={[styles.contentContainer, { transform: [{ scale: scaleAnim }] }]}>
        <Image source={require('../assets/img/ic_success.png')} />
        <View style={{ height: 26 }} />
        <Text style={{
          textAlign: 'center',
          fontFamily: 'Manrope-ExtraBold',
          fontSize: 40,
          includeFontPadding: false,
          color: Colors.secondary,
         }}>Yeay!</Text>
        <Text style={{
          textAlign: 'center',
          fontFamily: 'Manrope-ExtraBold',
          fontSize: 24,
          includeFontPadding: false,
          color: Colors.secondary,
         }}>Pembayaran Suskses 🎉</Text>
        <View style={{ height: 20 }} />
        <Text style={{
          textAlign: 'center',
          fontFamily: 'Manrope-Medium',
          fontSize: 20,
          includeFontPadding: false,
          color: Colors.secondary,
        }}>Terima kasih sudah memilih kami</Text>
      </Animated.View>
      <Button
        label='Kasih dokter rating nya yuk!'
        onPress={() => navigation.navigate('OrderDoctorSeventhStep' as never)}
        labelStyle={styles.semiboldText}
        buttonStyle={{
          position: 'absolute',
          left: 24,
          right: 24,
          bottom: 32,
          paddingVertical: 24,
          backgroundColor: Colors.textColor,
          borderRadius: 42,
        }} />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#19BD29',
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  semiboldText: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 20,
    color: Colors.secondary,
    includeFontPadding: false,
  },
  boldTextWhite: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    color: Colors.secondary,
    includeFontPadding: false,
  },
});

export default OrderDoctorFinishedScreen;