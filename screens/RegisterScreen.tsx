import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Colors  from '../styles/colors';
import ButtonWithIcon from '../components/ButtonWithIcon';
import LabeledInput from '../components/LabeledInput';
import Button from '../components/Button';
import SessionStorage from 'react-native-session-storage';

function RegisterScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const window = useWindowDimensions();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [numPhone, setNumPhone] = useState('');
  const [requireds, setRequireds] = useState<number[]>([]);
  const columnGap = 6
  const authButtonWidth = (window.width - styles.screenContainer.padding * 2 ) / 2 - columnGap

  useFocusEffect(() => {
    if (SessionStorage.getItem('@logged_in')) {
      navigation.navigate(...['Root', { screen: 'Home' }] as never)
    }
  })

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.screenContainer}>
      <Text style={styles.title}>Buat akun Anda</Text>
      <View style={{ height: 12 }} />
      <Text style={styles.regularTextMedium}>Daftar untuk menikmati layanan dokter dan ambulans darurat.</Text>
      <View style={{ height: 28 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <ButtonWithIcon
          icon={require('../assets/img/ic_google.png')}
          label='Gmail'
          labelStyle={styles.regularTextBlack}
          buttonStyle={[styles.button, { width: authButtonWidth }]}
          iconStyle={{ width: 28, height: 28, marginRight: 8 }}
          />
        <ButtonWithIcon
          icon={require('../assets/img/ic_facebook.png')}
          label='Facebook'
          labelStyle={styles.regularTextBlack}
          buttonStyle={[styles.button, { width: authButtonWidth }]}
          iconStyle={{ width: 28, height: 28, marginRight: 8 }}
          />
      </View>
      <View style={{ height: 28 }} />
      <Text style={[styles.regularTextMedium, { textAlign: 'center' }]}>atau daftar dengan</Text>
      <View style={{ height: 14 }} />
      <LabeledInput
        name='Name :'
        placeholder='Nama'
        value={name}
        setValue={setName}
        labelStyle={styles.inputLabel}
        placeholderTextColor='rgba(255, 255, 255, 0.6)'
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        />
      { requireds.includes(0) && <Text style={styles.required}>Harus di isi!</Text> }
      <LabeledInput
        name='Email :'
        placeholder='example@gmail.com'
        value={email}
        setValue={setEmail}
        inputMode='email'
        labelStyle={styles.inputLabel}
        placeholderTextColor='rgba(255, 255, 255, 0.6)'
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        />
      { requireds.includes(1) && <Text style={styles.required}>Harus di isi!</Text> }
      <LabeledInput
        name='Password :'
        placeholder='Password'
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
        labelStyle={styles.inputLabel}
        placeholderTextColor='rgba(255, 255, 255, 0.6)'
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        />
      { requireds.includes(2) && <Text style={styles.required}>Harus di isi!</Text> }
      <LabeledInput
        name='Nomor Telepon :'
        placeholder='+62 000 000 000'
        value={numPhone}
        setValue={setNumPhone}
        inputMode='numeric'
        labelStyle={styles.inputLabel}
        placeholderTextColor='rgba(255, 255, 255, 0.6)'
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        />
      { requireds.includes(3) && <Text style={styles.required}>Harus di isi!</Text> }
      <View style={{ height: 40 }} />
      <View style={{ flexDirection: 'row' , justifyContent: 'flex-end'}}>
          <Text style={[styles.regularTextSmall, { textAlign: 'right' }]}>
            Sudah perdah daftar?
          </Text>
          <View style={{width: 3}}/>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login' as never)}
            activeOpacity={0.5}>
            <Text style={styles.semiboldTextSmall}>
              Silahkan masuk
            </Text>
          </TouchableOpacity>
        </View>
      <View style={{ height: 18 }} />
      <Button
        label='Daftar'
        onPress={() => {
          const newRequireds = []
          let i = 0;
          for (const field of [name, email, password, numPhone]) {
            if (field.length <= 0) newRequireds.push(i)
              i++
          }
          setRequireds(newRequireds)

          if (newRequireds.length <= 0) {
            SessionStorage.setItem('@logged_in', true)
            navigation.navigate(...['Root', { screen: 'Home' }] as never)
          }
        }}
        buttonStyle={styles.button}
        labelStyle={{
          color: Colors.primary
        }}/>
      <View style={{ height: 64 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: Colors.primary,
  },
  button: {
    backgroundColor: Colors.secondary,
  },
  input: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: Colors.secondary,
    includeFontPadding: false,
  },
  inputLabel: {
    marginTop: 18,
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: Colors.secondary,
    includeFontPadding: false,
    marginBottom: 12,
  },
  inputContainer: {
    borderColor: Colors.secondary,
  },
  required: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: Colors.secondary,
    includeFontPadding: false,
    marginTop: 2,
  },
  title: {
    fontFamily: 'Manrope-Medium',
    fontSize: 30,
    color: Colors.secondary,
    includeFontPadding: false,
  },
  regularTextBlack: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    color: Colors.textColor,
    includeFontPadding: false,
  },
  regularTextMedium: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: Colors.secondary,
    includeFontPadding: false,
  },
  regularTextSmall: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: Colors.secondary,
    includeFontPadding: false,
  },
  semiboldTextSmall: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 14,
    color: Colors.secondary,
    includeFontPadding: false,
  },
});

export default RegisterScreen;