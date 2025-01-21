import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors  from '../styles/colors';
import Button from '../components/Button';
import ButtonWithIcon from '../components/ButtonWithIcon';

function WelcomeScreen(): React.JSX.Element {
  const navigation = useNavigation();

  return (
    <View style={styles.screenContainer}>
      <Image source={require('../assets/img/welcome.png')} style={styles.image}/>
      <View style={{height: 4}} />
      <Text style={styles.title}>Welcome to Medique</Text>
      <View style={{height: 6}} />
      <Text style={styles.subtitle}>Do you want some help with your health to get better life?</Text>
      <View style={{height: 25}} />
      <Button
        onPress={() => navigation.navigate('Register' as never)}
        label='Sign Up With Email'
        labelStyle={styles.buttonLabel}/>
      <View style={{height: 16}} />
      <ButtonWithIcon
        onPress={() => undefined}
        icon={require('../assets/img/ic_facebook.png')}
        label='Continue with Facebook'
        labelStyle={styles.buttonLabel}/>
      <View style={{height: 16}} />
      <ButtonWithIcon
        onPress={() => undefined}
        icon={require('../assets/img/ic_google.png')}
        label='Continue with Gmail'
        labelStyle={styles.buttonLabel}/>
      <View style={{height: 16}} />
      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Login' as never)}>
        <Text style={styles.regularText}>Masuk</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.secondary,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
  },
  buttonLabel: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
  },
  title: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    color: Colors.textColor,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.7)',
    textAlign: 'center',
  },
  regularText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.4)',
    textAlign: 'center',
  },
});

export default WelcomeScreen;