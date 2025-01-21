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
import ChatDoctor from './screens/ChatDoctorScreen';
import DetailPesananDoctor from './screens/DetailConsultationScreen';
import EditInformasiProfile from './screens/EditInformasiProfilScreen';
import EditAlamatProfilScreen from './screens/EditAlamatProfilScreen';
import AllArticleScreen from './screens/AllArticleScreen';
import ArticleScreen from './screens/ArticleScreen';
import Activity from './screens/ActivityScreen';

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
      name: 'Jl. Lombok, Kp. Rawa Lele',
      address: 'Kel. Jombang, Kec. Ciputat, Kota Tangerang Selatan, Banten, Indonesia',
      bookmark: false,
      location: {
        lat: -6.300894,
        lng: 106.702669
      },
      distance: 200,
    },
    {
      id: '2',
      name: 'Sekolah Seobono Mantoefani',
      address: 'Kel. Jombang, Kec. Ciputat, Kota Tangerang Selatan, Banten, Indonesia',
      bookmark: false,
      location: {
        lat: -6.301094,
        lng: 106.703069
      },
      distance: 500,
    },
    {
      id: '3',
      name: 'Jl. Bakhri, Kp. Rawa Lele',
      address: 'Kel. Jombang, Kec. Ciputat, Kota Tangerang Selatan, Banten, Indonesia',
      bookmark: false,
      location: {
        lat: -6.300694,
        lng: 106.703069,
      },
      distance: 700,
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
    email : "frendianton@gmail.com",
    numberPhone : '08123456789', 
    address : 'jalan pesangonan kanan kiri dan kanan atas',
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
  SessionStorage.setItem('@logged_in', true)
}

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  loadPublicSampleData()
  loadRequiredSessionData()

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"/>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Root' screenOptions={{headerShown: false}}>
          <Stack.Screen name='Loading' component={LoadingScreen}/>
          <Stack.Screen name='Welcome' component={WelcomeScreen}/>
          <Stack.Screen name='Login' component={LoginScreen}/>
          <Stack.Screen name='Register' component={RegisterScreen}/>
          <Stack.Screen name='ForgotPassword' component={ForgotPasswordGroup}/>
          <Stack.Screen name='CreateNewPassword' component={CreateNewPasswordScreen}/>
          <Stack.Screen name='AllArticle' component={AllArticleScreen}/>
          <Stack.Screen name='Article' component={ArticleScreen}/>
          <Stack.Screen name='Activity' component={Activity}/>
          <Stack.Screen name='Chat' component={ChatDoctor}/>
          <Stack.Screen name='DetailPesananDoctor' component={DetailPesananDoctor}/>
          <Stack.Screen name="EditInformasiProfil" component={EditInformasiProfile}/>
          <Stack.Screen name="EditAlamatProfil" component={EditAlamatProfilScreen}/>
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
