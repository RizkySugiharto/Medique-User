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
import LabeledInput from '../components/LabeledInput';
import Button from '../components/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function CreateNewPasswordScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <KeyboardAwareScrollView style={styles.screenContainer} contentContainerStyle={{flexGrow: 1}}>
      <View style={{height: 8}} />
      <Image source={require('../assets/img/create_new_password.jpg')} style={styles.image}/>
      <View style={{height: 4}} />
      <Text style={styles.message} children={'Create your\nnew Password'}/>
      <View style={{height: 32}} />
      <LabeledInput 
        value={password}
        setValue={setPassword}
        name='Password :'
        placeholder='12345678'
        secureTextEntry={true} />
      <View style={{height: 26}} />
      <LabeledInput 
        value={confirmPassword}
        setValue={setConfirmPassword}
        name='Confrim Password :'
        placeholder='12345678'
        secureTextEntry={true} />
      <View style={{height: 14}} />
      <View style={{flexDirection: 'row'}}>
        <Pressable style={styles.checkbox}>
        </Pressable>
        <Text style={styles.checkboxLabel}>Remember Me</Text>
      </View>
      <View style={{height: 30}} />
      <Button label='Update' />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.secondary
  },
  image: {
    alignSelf: 'center',
  },
  message: {
    fontFamily: 'Manrope-Medium',
    fontSize: 30,
    color: Colors.textColor,
    letterSpacing: 0,
    lineHeight: 32,
  },
  checkbox: {
    borderRadius: 4,
    borderColor: Colors.primary,
    borderWidth: 2,
    backgroundColor: Colors.primaryShadow,
    width: 24,
    height: 24,
  },
  checkboxLabel: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.5)',
    marginLeft: 8,
  },
});

export default CreateNewPasswordScreen;