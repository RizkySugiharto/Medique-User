/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  View,
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
import DoctorDetailsScreen from './screens/DoctorDetailsScreen';
import OrderDoctorGroup from './screens/groups/OrderDoctorGroup';
import SessionStorage from 'react-native-session-storage';
import TrackDoctorScreen from './screens/TrackDoctorScreen';
import OrderAmbulanceGroup from './screens/groups/OrderAmbulanceGroup';
import RegisterScreen from './screens/RegisterScreen';
import LoadingScreen from './screens/LoadingScreen';

Geolocation.setRNConfiguration({
  locationProvider: 'playServices',
  skipPermissionRequests: true,
})

function loadPublicSampleData() {
  SessionStorage.setItem('@favorited_doctors', [
    {
      id: 1,
      profile: require('./assets/img/placeholder_doctor.png'),
      name: 'Dr. Sumanto',
      category: 'Dokter Umum',
      favorite: true,
      rating: 4.8,
      experience: 8
    },
    {
      id: 2,
      profile: require('./assets/img/placeholder_doctor.png'),
      name: 'Dr. Evan',
      category: 'Dokter Umum',
      favorite: true,
      rating: 4.8,
      experience: 8
    },
    {
      id: 3,
      profile: require('./assets/img/placeholder_doctor.png'),
      name: 'Dr. Evan',
      category: 'Dokter Umum',
      favorite: true,
      rating: 4.8,
      experience: 8
    },
    {
      id: 4,
      profile: require('./assets/img/placeholder_doctor.png'),
      name: 'Dr. Sumanto',
      category: 'Dokter Umum',
      favorite: true,
      rating: 4.8,
      experience: 8
    },
    {
      id: 5,
      profile: require('./assets/img/placeholder_doctor.png'),
      name: 'Dr. Evan',
      category: 'Dokter Umum',
      favorite: true,
      rating: 4.8,
      experience: 8
    },
    {
      id: 6,
      profile: require('./assets/img/placeholder_doctor.png'),
      name: 'Dr. Sumanto',
      category: 'Dokter Umum',
      favorite: true,
      rating: 4.8,
      experience: 8
    },
  ]),
  SessionStorage.setItem('@categories', [
    {
      icon: require('./assets/img/ic_pediatrician_specialist.png'),
      name: 'Dokter Spesialis Anak',
    },
    {
      icon: require('./assets/img/ic_general_practitioners.png'),
      name: 'Dokter Umum',
    },
    {
      icon: require('./assets/img/ic_nutrition_specialist_doctor.png'),
      name: 'Dokter Spesialis Gizi',
    },
    {
      icon: require('./assets/img/ic_psychiatrist.png'),
      name: 'Psikiater',
    },
    {
      icon: require('./assets/img/ic_ent_specialist_doctor.png'),
      name: 'Dokter Spesialis THT',
    },
    {
      icon: require('./assets/img/ic_rehabilitation_doctor.png'),
      name: 'Dokter Rehabilitasi',
    },
    {
      icon: require('./assets/img/ic_allergy_&_immunology_doctor.png'),
      name: 'Dokter Alergi & Imunologi',
    },
    {
      icon: require('./assets/img/ic_internal_medicine_specialist.png'),
      name: 'Dokter Spesialis Penyakit Dalam',
    },
  ])
  SessionStorage.setItem('@bookmarked_places', [
    {
      id: '1',
      name: 'Jombang',
      address: 'Jombang, Kec. Ciputat, Kota Tangerang Selatan, Banten, Indonesia',
      location: {
        lat: 127,
        lng: 62,
      },
      distance: 700,
    },
    {
      id: '2',
      name: 'Jombang',
      address: 'Jombang, Kec. Ciputat, Kota Tangerang Selatan, Banten, Indonesia',
      location: {
        lat: 127,
        lng: 62,
      },
      distance: 700,
    },
    {
      id: '3',
      name: 'Jombang',
      address: 'Jombang, Kec. Ciputat, Kota Tangerang Selatan, Banten, Indonesia',
      location: {
        lat: 127,
        lng: 62,
      },
      distance: 700,
    },
  ])
  SessionStorage.setItem('@search_places', [
    {
      id: '1',
      name: 'Jombang Ciputat',
      address: 'Jombang, Kec. Ciputat, Kota Tangerang Selatan, Banten, Indonesia',
      location: {
        lat: 127,
        lng: 62,
      },
      distance: 200,
    },
    {
      id: '2',
      name: 'Jombang Tangsel',
      address: 'Jombang, Kec. Ciputat, Kota Tangerang Selatan, Banten, Indonesia',
      location: {
        lat: 127,
        lng: 62,
      },
      distance: 700,
    },
    {
      id: '3',
      name: 'Jombang Rawa Lele',
      address: 'Jombang, Kec. Ciputat, Kota Tangerang Selatan, Banten, Indonesia',
      location: {
        lat: 127,
        lng: 62,
      },
      distance: 500,
    },
    {
      id: '4',
      name: 'Jombang',
      address: 'Jombang, Kec. Ciputat, Kota Tangerang Selatan, Banten, Indonesia',
      location: {
        lat: 127,
        lng: 62,
      },
      distance: 900,
    },
  ])
  SessionStorage.setItem('@current_location', {
    lat: -6.300694,
    lng: 106.702869
  })
  SessionStorage.setItem('@nearby_places', [
    {
      id: '1',
      name: 'Jl. priview jalan seperti di tiitk',
      address: 'Jl. priview jalan seperti di titik lebih detail',
      location: {
        lat: -6.300894,
        lng: 106.702669
      },
    },
    {
      id: '2',
      name: 'Jl. priview jalan seperti di tiitk',
      address: 'Jl. priview jalan seperti di titik lebih detail',
      location: {
        lat: -6.301094,
        lng: 106.703069
      },
    },
  {
      id: '3',
      name: 'Jl. priview jalan seperti di tiitk',
      address: 'Jl. priview jalan seperti di titik lebih detail',
      location: {
        lat: -6.300694,
        lng: 106.703069,
      },
    },
  ])
  SessionStorage.setItem('@navbar_status_view', undefined)
  SessionStorage.setItem('@payment_diseases', ['Demam', 'Sakit Kepala'])
  SessionStorage.setItem('@payment_actions', ['Konsultasi', 'Pemeriksaan'])
  SessionStorage.setItem('@payment_prices', [
    { name: 'Biaya Dokter', price: 300_000 },
    { name: 'Paracetamol', price: 10_000 },
  ])
  SessionStorage.setItem('@user_data', {
    profile: require('./assets/img/placeholder_user.png'),
    name: 'Frendi Anton',
    gender: 'Laki-Laki',
    birthDate: new Date(Date.parse('1989-09-14')),
  })
  SessionStorage.setItem('@selected_doctor', {
    profile: require('./assets/img/placeholder_doctor.png'),
    name: 'Dr. Abdul',
    category: 'Dokter Umum',
    favorite: false,
    price: {
      start: 300_000,
      end: 500_000
    }
  }),
  SessionStorage.setItem('@nearby_ambulances', [
    {
      id: 1,
      name: 'RS Puspita',
      price: 30_000,
      address: 'Jalan Serua Indah, Pamulang',
      location: {
        lat: -6.300894,
        lng: 106.702669
      },
    },
    {
      id: 2,
      name: 'RS Puspita',
      price: 30_000,
      address: 'Jalan Serua Indah, Pamulang',
      location: {
        lat: -6.300694,
        lng: 106.703069,
      },
    },
    {
      id: 3,
      name: 'RS Puspita',
      price: 30_000,
      address: 'Jalan Serua Indah, Pamulang',
      location: {
        lat: -6.301094,
        lng: 106.703069
      },
    },
    {
      id: 4,
      name: 'RS Puspita',
      price: 30_000,
      address: 'Jalan Serua Indah, Pamulang',
      location: {
        lat: -6.300394,
        lng: 106.702069
      },
    },
    {
      id: 5,
      name: 'RS Puspita',
      price: 30_000,
      address: 'Jalan Serua Indah, Pamulang',
      location: {
        lat: -6.300094,
        lng: 106.701869
      },
    },
  ])
}

function loadRequiredSessionData() {
  SessionStorage.setItem('@loading_status', false)
}

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  loadPublicSampleData()

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"/>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Loading' screenOptions={{headerShown: false}}>
          <Stack.Screen name='Loading' component={LoadingScreen}/>
          <Stack.Screen name='Welcome' component={WelcomeScreen}/>
          <Stack.Screen name='Login' component={LoginScreen}/>
          <Stack.Screen name='Register' component={RegisterScreen}/>
          <Stack.Screen name='ForgotPassword' component={ForgotPasswordGroup}/>
          <Stack.Screen name='CreateNewPassword' component={CreateNewPasswordScreen}/>
          <Stack.Screen name='PopularDoctor' component={PopularDoctorScreen}/>
          <Stack.Screen name='DoctorCategories' component={DoctorCategoriesScreen}/>
          <Stack.Screen name='DoctorDetails' component={DoctorDetailsScreen}/>
          <Stack.Screen name='Root' component={RootGroup}/>
          <Stack.Screen name='OrderDoctor' component={OrderDoctorGroup}/>
          <Stack.Screen name='TrackDoctor' component={TrackDoctorScreen}/>
          <Stack.Screen name='OrderAmbulance' component={OrderAmbulanceGroup}/>
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
