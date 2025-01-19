import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native';
import { BarIndicator } from '@deelo55/react-native-indicators';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Colors  from '../styles/colors';
import SessionStorage from 'react-native-session-storage';

function LoadingScreen(): React.JSX.Element {
  const navigation = useNavigation();
  
  useFocusEffect(() => {
    if (SessionStorage.getItem('@loading_status')) {
      navigation.navigate('Login' as never)
    } else {
      setTimeout(() => {
        SessionStorage.setItem('@loading_status', true)
        navigation.navigate('Login' as never)
      }, 500)
    }
  })

  return (
    <View style={styles.screenContainer}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/img/logo.png')} style={styles.logo}/>
        <Text style={styles.logoName}>Medique</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <BarIndicator
          color={Colors.textColor}
          count={12}
          size={45} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.secondary,
  },
  logoContainer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  logo: {
    width: 82,
    height: 82,
    marginRight: 6,
  },
  logoName: {
    fontSize: 32,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.textColor,
  },
});

export default LoadingScreen;