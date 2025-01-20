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
import { AmbulanceData, CategoryData, DoctorData, PlaceData, ReviewData, UserData } from './types';

const doctorsData: DoctorData[] = [
  {
    id: 1,
    profile: require('./assets/img/dr_abdul.png'),
    name: 'Dr. Abdul',
    category: 'Dokter Spesialis Anak',
    favorite: false,
    rating: 4.8,
    experience: 8,
    details: {
      patients: 105,
      address: 'Rumah sakit asri asih ciputat',
      description: "Halo, saya Dr. Abdul, dokter umum di Rumah Sakit Sarih Asih. Saya berkomitmen memberikan perawatan terbaik dengan pendekatan empatik dan ramah. Selain berpraktek, saya aktif dalam edukasi kesehatan dan terus memperbarui pengetahuan medis untuk membantu pasien memahami dan menjaga kesehatan mereka dengan lebih baik.",
      workingTime: 'Senin - Minggu : 09:00 AM - 08:00 PM',
      price: {
        from: 100_000,
        to: 500_000,
      },
      reviewCount: 1013,
    },
  },
  {
    id: 2,
    profile: require('./assets/img/dr_evan.png'),
    name: 'Dr. Evan',
    category: 'Dokter Umum',
    favorite: true,
    rating: 4.7,
    experience: 2,
    details: {
      patients: 105,
      address: 'Rumah sakit asri asih ciputat',
      description: "Halo, saya Dr. Evan, dokter umum di Rumah Sakit Sarih Asih. Saya berkomitmen memberikan perawatan terbaik dengan pendekatan empatik dan ramah. Selain berpraktek, saya aktif dalam edukasi kesehatan dan terus memperbarui pengetahuan medis untuk membantu pasien memahami dan menjaga kesehatan mereka dengan lebih baik.",
      workingTime: 'Senin - Minggu : 10:00 AM - 09:00 PM',
      price: {
        from: 100_000,
        to: 500_000,
      },
      reviewCount: 2013,
    },
  },
  {
    id: 3,
    profile: require('./assets/img/dr_sumanto.png'),
    name: 'Dr. Sumanto',
    category: 'Dokter Umum',
    favorite: true,
    rating: 4.5,
    experience: 4,
    details: {
      patients: 105,
      address: 'Rumah sakit asri asih ciputat',
      description: "Halo, saya Dr. Sumanto, dokter umum di Rumah Sakit Sarih Asih. Saya berkomitmen memberikan perawatan terbaik dengan pendekatan empatik dan ramah. Selain berpraktek, saya aktif dalam edukasi kesehatan dan terus memperbarui pengetahuan medis untuk membantu pasien memahami dan menjaga kesehatan mereka dengan lebih baik.",
      workingTime: 'Senin - Minggu : 09:00 AM - 10:00 PM',
      price: {
        from: 100_000,
        to: 500_000,
      },
      reviewCount: 1513,
    },
  },
]
const categoriesData: CategoryData[] = [
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
]
const placesData: PlaceData[] = [
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
]
const ambulancesData: AmbulanceData[] = [
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
]
const reviewsData: ReviewData[] = [
  {
    userProfile: require('./assets/img/user_jhon.png'),
    userName: 'Bang Jhon',
    rating: 4,
    message: "Dr. Abdul adalah dokter hebat! Beliau tidak hanya mengobati, tetapi juga memahami kondisi anak saya dengan penuh kasih. Penjelasannya selalu jelas dan membuat kami merasa tenang. Sangat direkomendasikan untuk keluarga mana pun!"
  },
  {
    userProfile: require('./assets/img/user_jhon.png'),
    userName: 'Bang Jhon',
    rating: 4.5,
    message: "Dr. Abdul adalah dokter luar biasa! Beliau tidak hanya mengobati, tetapi juga memahami kondisi anak saya dengan penuh kasih. Penjelasannya selalu jelas dan membuat kami merasa tenang. Sangat direkomendasikan untuk keluarga mana pun!"
  },
]
const userData: UserData = {
  profile: require('./assets/img/user_frendi.png'),
  name: 'Frendi Anton',
  gender: 'Laki-Laki',
  birthDate: new Date(Date.parse('1989-09-14')),
  email: 'frendi@gmal.com',
  numberPhone: '0812618192'
}

function loadPublicSampleData() {
  SessionStorage.setItem('@doctors', doctorsData)
  SessionStorage.setItem('@categories', categoriesData)
  SessionStorage.setItem('@bookmarked_places', placesData.map((value) => ({...value, bookmark: true})))
  SessionStorage.setItem('@search_places', [...placesData, placesData[0]])
  SessionStorage.setItem('@current_location', {
    lat: -6.300694,
    lng: 106.702869
  })
  SessionStorage.setItem('@nearby_places', placesData)
  SessionStorage.setItem('@navbar_status_view', undefined)
  SessionStorage.setItem('@payment_diseases', ['Demam', 'Sakit Kepala'])
  SessionStorage.setItem('@payment_actions', ['Konsultasi', 'Pemeriksaan'])
  SessionStorage.setItem('@payment_prices', [
    { name: 'Biaya Dokter', price: 300_000 },
    { name: 'Paracetamol', price: 10_000 },
  ])
  SessionStorage.setItem('@user_data', userData)
  SessionStorage.setItem('@selected_doctor', undefined)
  SessionStorage.setItem('@selected_doctor_status', undefined)
  SessionStorage.setItem('@selected_category', undefined)
  SessionStorage.setItem('@selected_payment_method', 0)
  SessionStorage.setItem('@nearby_ambulances', ambulancesData)
  SessionStorage.setItem('@reviews', reviewsData)
  SessionStorage.setItem('@testimoni', [reviewsData[0]])
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
