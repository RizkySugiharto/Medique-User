import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  TouchableOpacity,
  TouchableHighlight,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Colors  from '../styles/colors';
import LabeledInput from '../components/LabeledInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import Button from '../components/Button';
import ButtonWithIcon from '../components/ButtonWithIcon';
import SessionStorage from 'react-native-session-storage';

function LoginScreen(): React.JSX.Element {
  const window = useWindowDimensions();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [requireds, setRequireds] = useState<number[]>([])
  const columnGap = 6
  const authButtonWidth = (window.width - styles.screenContainer.padding * 2 ) / 2 - columnGap

  useFocusEffect(() => {
    if (SessionStorage.getItem('@logged_in')) {
      navigation.navigate(...['Root', { screen: 'Home' }] as never)
    }
  })

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.screenContainer}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/img/logo.png')} style={styles.logo}/>
          <Text style={styles.logoName}>Medique</Text>
        </View>
        <View>
          <Text style={styles.title}>Silahkan Masuk</Text>
          <Text style={styles.normalText}>Lorem ipsum dolor sit amet, consectur adipiscing elit. Sed do</Text>
        </View>
        <View style={{ height: 16 }} />
        <View>
          <LabeledInput
            value={email}
            setValue={setEmail}
            name='Email :'
            placeholder='Example@gmail.com'/>
          { requireds.includes(0) && <Text style={styles.required}>Harus di isi!</Text> }
          <View style={{height: 20}}/>
          <LabeledInput
            value={password}
            setValue={setPassword}
            name='Password :'
            placeholder='Password'
            secureTextEntry={true}/>
          { requireds.includes(1) && <Text style={styles.required}>Harus di isi!</Text> }
        </View>
        <View style={{ height: 26 }} />
        <Text style={[styles.normalText, { color: Colors.primary, textAlign: 'center' }]}>atau masuk dengan</Text>
        <View style={{ height: 26 }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <ButtonWithIcon
            icon={require('../assets/img/ic_google.png')}
            label='Gmail'
            activeOpacity={0.6}
            labelStyle={styles.normalText}
            buttonStyle={[styles.authButton, { width: authButtonWidth }]}
            iconStyle={{ width: 28, height: 28, marginRight: 8 }}
            />
          <ButtonWithIcon
            icon={require('../assets/img/ic_facebook.png')}
            label='Facebook'
            activeOpacity={0.6}
            labelStyle={styles.normalText}
            buttonStyle={[styles.authButton, { width: authButtonWidth }]}
            iconStyle={{ width: 28, height: 28, marginRight: 8 }}
            />
        </View>
        <View style={{ height: 32 }} />
        <View style={{ marginBottom: 18, flexDirection: 'row' , justifyContent: 'flex-end'}}>
          <Text style={[styles.normalText, { textAlign: 'right' }]}>
            Belum mempunyai akun?
          </Text>
          <View style={{width: 3}}/>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register' as never)}
            activeOpacity={0.5}>
            <Text style={[styles.normalText, { color: Colors.primary }]}>
              Daftar
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          label='Masuk'
          onPress={() => {
            const newRequireds = []
            let i = 0;
            for (const field of [email, password]) {
              if (!email) newRequireds.push(i)
              i++
            }
            setRequireds(newRequireds)

            if (newRequireds.length <= 0) {
              SessionStorage.setItem('@logged_in', true)
              navigation.navigate(...['Root', { screen: 'Home' }] as never)
            }
          }}/>
      </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: Colors.secondary,
  },
  logoContainer: {
    paddingVertical: 48,
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
    marginBottom: 6,
  },
  normalText: {
    fontSize: 16,
    fontFamily: 'Manrope-Regular',
    color: Colors.textColor,
  },
  authButton: {
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1.5,
    borderRadius: 40
  },
  required: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: Colors.primary,
    includeFontPadding: false,
    marginTop: 2,
  },
});

export default React.memo(LoginScreen);