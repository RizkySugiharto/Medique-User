import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors  from '../styles/colors';
import Button from '../components/Button';

type Option = 'sms' | 'email';

function ForgotPasswordSelectScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const [selected, setSelected] = useState<Option>('sms');

  return (
    <View style={styles.screenContainer}>
      <Image source={require('../assets/img/forgot_password.png')} style={styles.image}/>
      <View style={{height: 30}} />
      <Text style={styles.message}>Lorem ipsum dolor sit amet, consectur adipiscing elit. Sed d</Text>
      <View style={{height: 34}} />
      <Pressable
        key='sms'
        onPress={() => setSelected('sms')}
        style={[styles.card, selected == 'sms' && styles.cardActive]}>
        <View style={styles.cardIcon}>
          <Image source={require('../assets/img/ic_sms_filled.png')} style={styles.icon}/>
        </View>
        <View style={styles.cardDescription}>
          <Text style={styles.description}>Via SMS</Text>
          <Text style={styles.description}>089********43</Text>
        </View>
      </Pressable>
      <View style={{height: 24}} />
      <Pressable
        key='email'
        onPress={() => setSelected('email')}
        style={[styles.card, selected == 'email' && styles.cardActive]}>
        <View style={styles.cardIcon}>
          <Image source={require('../assets/img/ic_email_filled.png')} style={styles.icon}/>
        </View>
        <View style={styles.cardDescription}>
          <Text style={styles.description}>Via Email</Text>
          <Text style={styles.description}>Fre************ndi@gmail.com</Text>
        </View>
      </Pressable>
      <View style={{height: 40}} />
      <Button label='Continue' onPress={() => navigation.navigate(...['ForgotPassword', {
        screen: 'Verify',
        params: {
          type: selected,
          sender: '0891789835243',
          senderHidden: '089********43',
        }
      }] as never)} />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.secondary,
  },
  image: {
    alignSelf: 'center',
  },
  message: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: Colors.textColor,
  },
  card: {
    paddingVertical: 20,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  cardActive: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  cardIcon: {
    borderRadius: 100,
    backgroundColor: Colors.primaryShadow,
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
    marginRight: 12,
  },
  icon: {
    width: 24,
    height: 24,
  },
  cardDescription: {
    justifyContent: 'space-between',
  },
  description: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.5)',
  },
});

export default ForgotPasswordSelectScreen;