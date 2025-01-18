import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors  from '../styles/colors';
import LabeledInput from '../components/LabeledInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import Button from '../components/Button';

function LoginScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAwareScrollView style={styles.screenContainer} contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/img/logo.png')} style={styles.logo}/>
          <Text style={styles.logoName}>Medique</Text>
        </View>
        <View style={{marginBottom: 32}}>
          <Text style={styles.title}>Silahkan Masuk</Text>
          <Text style={styles.normalText}>Lorem ipsum dolor sit amet, consectur adipiscing elit. Sed do</Text>
        </View>
        <View style={{marginBottom: 26}}>
          <LabeledInput
            value={email}
            setValue={setEmail}
            name='Email :'
            placeholder='Example@gmail.com'/>
          <View style={{height: 26}}/>
          <LabeledInput
            value={password}
            setValue={setPassword}
            name='Password :'
            placeholder='Password'/>
        </View>
        <View style={{ marginBottom: 18, flexDirection: 'row' , justifyContent: 'flex-end'}}>
          <Text style={[styles.normalText, { textAlign: 'right' }]}>
            Belum mempunyai akun?
          </Text>
          <View style={{width: 3}}/>
          <TouchableOpacity activeOpacity={0.5}>
            <Text style={[styles.normalText, { color: Colors.primary }]}>
              Daftar
            </Text>
          </TouchableOpacity>
        </View>
        <Button label='Masuk'/>
        <View style={{height: 54}}/>
      </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.secondary,
  },
  logoContainer: {
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoName: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.textColor,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Manrope-Medium',
    color: Colors.textColor,
    marginBottom: 10,
  },
  normalText: {
    fontSize: 16,
    fontFamily: 'Manrope-Regular',
    color: Colors.textColor,
  },
});

export default LoginScreen;