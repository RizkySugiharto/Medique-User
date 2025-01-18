import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors  from '../styles/colors';
import StepsHeaderBar from '../components/StepsHeaderBar';
import { sub as subtractDate } from 'date-fns';
import Button from '../components/Button';
import LabeledInput from '../components/LabeledInput';
import utils from '../utils';
import SessionStorage from 'react-native-session-storage';

interface UserData {
  name: string,
  gender: 'Laki-Laki' | 'Perempuan',
  birthDate: Date,
}

interface DoctorData {
  profile: any,
  name: string,
  category: string,
  startPrice: number,
}

function getUserData(): UserData {
  const data = SessionStorage.getItem('@user_data')
  return {
    name: data.name,
    gender: data.gender,
    birthDate: data.birthDate
  }
}

function getDoctorData(): DoctorData {
  const data = SessionStorage.getItem('@selected_doctor')
  return {
    profile: data.profile,
    name: data.name,
    category: data.category,
    startPrice: data.price.start,
  }
}

function OrderDoctorFifthStepScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const doctorData = getDoctorData()
  const userData = getUserData()
  const totalPrice = 300_000;
  const numFormat = Intl.NumberFormat('id-ID')
  
  return (
    <View style={styles.screenContainer}>
      <StepsHeaderBar
        label='Pemesanan Dokter'
        message='Langkah kelima: Pembayaran awal'
        step={5}
        maxSteps={7}/>
      <View style={{ height: 12, opacity: 0 }} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.contentContainer}>
        <View>
          <View style={{ height: 20, opacity: 0 }} />
          <LabeledInput
            name='Informasi pasien'
            value={`${userData.name}, ${userData.gender}, ${utils.calculateAge(userData.birthDate)} tahun`}
            readOnly={true}
            labelStyle={styles.semiboldText}/>
          <View style={{ height: 32 }} />
          <View style={{ flexDirection: 'row' }}>
            <View style={{
              borderRadius: '100%',
              overflow: 'hidden',
              width: 76,
              height: 76
            }}>
              <Image source={doctorData.profile} style={{
                width: 76,
                height: 76
              }} />
            </View>
            <View style={{ width: 16 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.boldText}>{doctorData.name}</Text>
              <Text style={styles.semiboldText}>{doctorData.category}</Text>
              <View style={{ height: 10 }} />
              <Text style={styles.linkText}>Lihat profil lengkap</Text>
            </View>
          </View>
          <View style={{ height: 32 }} />
          <LabeledInput
            name='Pembayaran awal sebesar :'
            value={`${numFormat.format(totalPrice)} Rupiah`}
            readOnly={true}
            labelStyle={styles.semiboldText}/>
        </View>
      </ScrollView>
      <Button
        label='Lanjut'
        onPress={() => navigation.navigate('TrackDoctor' as never)}
        buttonStyle={{
          position: 'absolute',
          bottom: 30,
          left: 24,
          right: 24,
        }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: Colors.secondary,
    paddingHorizontal: 24,
  },
  boldText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: Colors.textColor,
    includeFontPadding: false,
  },
  regularText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: Colors.textColor,
    includeFontPadding: false,
  },
  semiboldText: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 16,
    color: Colors.textColor,
    includeFontPadding: false,
  },
  linkText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    color: Colors.primary,
    includeFontPadding: false,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    textDecorationColor: Colors.primary,
    alignSelf: 'flex-end',
  },
});

export default OrderDoctorFifthStepScreen;