/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Geolocation from '@react-native-community/geolocation';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ForgotPasswordGroup from './screens/groups/ForgotPasswordGroup';
import CreateNewPasswordScreen from './screens/CreateNewPasswordScreen';
import RootGroup from './screens/groups/RootGroup';
import PopularDoctorScreen from './screens/PopularDoctorScreen';
import DoctorCategoriesScreen from './screens/DoctorCategoriesScreen';
// import DoctorDetailsScreen from './screens/DoctorDetailsScreen';

Geolocation.setRNConfiguration({
  locationProvider: 'playServices',
  skipPermissionRequests: true,
})

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"/>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Root' screenOptions={{headerShown: false}}>
          <Stack.Screen name='Welcome' component={WelcomeScreen}/>
          <Stack.Screen name='Login' component={LoginScreen}/>
          <Stack.Screen name='ForgotPassword' component={ForgotPasswordGroup}/>
          <Stack.Screen name='CreateNewPassword' component={CreateNewPasswordScreen}/>
          <Stack.Screen name='PopularDoctor' component={PopularDoctorScreen}/>
          <Stack.Screen name='DoctorCategories' component={DoctorCategoriesScreen}/>
          {/* <Stack.Screen name='DoctorDetails' component={DoctorDetailsScreen}/> */}
          <Stack.Screen name='Root' component={RootGroup}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
