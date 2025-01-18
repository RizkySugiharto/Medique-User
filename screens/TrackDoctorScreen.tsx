import React, { createRef, ReactElement, ReactNode, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors  from '../styles/colors';
import Button from '../components/Button';
import StackHeaderBar from '../components/StackHeaderBar';
import MapView, { Circle, Marker } from 'react-native-maps';
import { ShadowedView, shadowStyle } from 'react-native-fast-shadow';
import SessionStorage from 'react-native-session-storage';
import utils from '../utils';

interface Location {
  lat: number,
  lng: number
}

interface DoctorData {
  profile: any,
  name: string,
  category: string,
  status: 'on-the-way' | 'finished'
}

interface LocationStatus {
  time: number,
  distance: number,
  location: Location,
}

function NavbarStatusView({ doctorData, doctorLocStatus }: { doctorData: DoctorData, doctorLocStatus: LocationStatus }): ReactNode | ReactElement {
  const navigation = useNavigation();

  return (
    <>
      { doctorData.status === 'on-the-way' ?
      <View style={styles.navbarContainer}>
        <View style={{ borderRadius: '100%', width: 54, height: 54, overflow: 'hidden' }}>
          <Image
            source={doctorData.profile}
            style={{ width: 54, height: 54 }}/>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Text style={styles.navbarTitle}>Tiba dalam {utils.timeToText(doctorLocStatus.time)}</Text>
          <View style={{ height: 2 }} />
          <Text style={styles.navbarSubtitle} numberOfLines={1}>{doctorData.name}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('TrackDoctor' as never)}
          activeOpacity={0.5}
          style={styles.navbarButton}>
          <Text style={styles.navbarButtonLabel}>Lacak</Text>
        </TouchableOpacity>
      </View>
      :
      <View style={styles.navbarContainer}>
        <View style={{ borderRadius: '100%', width: 54, height: 54, overflow: 'hidden' }}>
          <Image
            source={doctorData.profile}
            style={{ width: 54, height: 54 }}/>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Text style={styles.navbarTitle}>Lihat rincian biaya</Text>
          <View style={{ height: 2 }} />
          <Text style={styles.navbarSubtitle} numberOfLines={1}>{doctorData.name}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate(...['OrderDoctor', { screen: 'OrderDoctorSixthStep' }] as never)}
          activeOpacity={0.5}
          style={styles.navbarButton}>
          <Text style={styles.navbarButtonLabel}>Lihat</Text>
        </TouchableOpacity>
      </View>
      }
    </>
  )
}

function TrackDoctorScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const map = createRef<MapView>();
  const currentLoc = SessionStorage.getItem('@current_location');
  const doctorData: DoctorData = {
    profile: require('../assets/img/placeholder_doctor.png'),
    name: 'Dr. Sumanto',
    category: 'Dokter Umum',
    status: 'finished',
  }
  const doctorLocStatus: LocationStatus = {
    time: 300,
    distance: 2500,
    location: {
      lat: -6.300594,
      lng: 106.702969,
    },
  }

  SessionStorage.setItem('@navbar_status_view', (
    <NavbarStatusView
      doctorData={doctorData}
      doctorLocStatus={doctorLocStatus}/>
  ))
  
  return (
    <View style={styles.screenContainer}>
      <MapView
        key='TrackDoctorScreen'
        ref={map}
        zoomEnabled={true}
        rotateEnabled={true}
        onMapLoaded={() => {
          map.current?.setCamera({
            center: {
              latitude: doctorLocStatus.location.lat,
              longitude: doctorLocStatus.location.lng
            },
            pitch: 1,
            zoom: 20,
            heading: 1,
          })
        }}
        style={styles.map}>
        <Marker
          coordinate={{
            latitude: doctorLocStatus.location.lat,
            longitude: doctorLocStatus.location.lng
          }}
          icon={require('../assets/img/placeholder_doctor_marker.png')}/>
        <Marker
          coordinate={{
            latitude: currentLoc.lat,
            longitude: currentLoc.lng
          }}
          icon={require('../assets/img/ic_map_marker.png')}/>
      </MapView>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <ShadowedView
          style={shadowStyle({
            color: 'rgba(0, 0, 0, 0.25)',
            opacity: 1,
            offset: [0, 2],
            radius: 10,
          })}>
          <StackHeaderBar
            label='Kembali'
            onPress={() => navigation.navigate(...['Root', { screen: 'Home' }] as never)}
            containerStyle={{
              padding: 24,
            }}
            labelStyle={{
              fontFamily: 'Manrope-Bold',
              fontSize: 16,
              marginLeft: 12,
            }} />
        </ShadowedView>
        <ShadowedView
          style={shadowStyle({
            color: 'rgba(0, 0, 0, 0.25)',
            opacity: 1,
            offset: [0, -4],
            radius: 20,
          })}>
          <View style={styles.card}>
            <View style={{ paddingHorizontal: 24 }}>
              <Text style={styles.highlightText}>{
                doctorData.status === 'on-the-way' ?
                'Dokter segera menuju ke lokasi kamu'
                :
                'Dokter sudah selesai'
              }</Text>
              <View style={{ height: 20 }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.boldText}>{doctorData.name}</Text>
                  <View style={{ height: 6 }} />
                  <Text style={styles.regularText}>{doctorData.category}</Text>
                </View>
                <View style={{
                  width: 74,
                  height: 74,
                  overflow: 'hidden',
                  borderRadius: '100%',
                  }}>
                  <Image source={doctorData.profile} style={{ width: 74, height: 74 }} />
                </View>
              </View>
            </View>
            <View style={{ height: 18 }} />
            <View style={{ height: 1, backgroundColor: Colors.textColorSecondary, width: '100%' }} />
            <View style={{ height: 16 }} />
            <View style={{ paddingHorizontal: 24 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../assets/img/ic_pin_time.png')} style={{ width: 24, height: 24 }} />
                <View style={{ width: 12 }} />
                { doctorData.status === 'on-the-way' ?
                <Text style={styles.extraboldText}>Tiba dalam {utils.timeToText(doctorLocStatus.time)}</Text>
                :
                <Text style={styles.extraboldText}>Lihat rincian biaya</Text>
                }
              </View>
              <View style={{ height: 8 }} />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../assets/img/ic_pin_distance.png')} style={{ width: 24, height: 24 }} />
                <View style={{ width: 12 }} />
                <Text style={styles.regularText}>Jarak: {utils.distanceToText(doctorLocStatus.distance)}</Text>
              </View>
              <View style={{ height: 32 }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity
                  activeOpacity={0.65}
                  style={{ padding: 20, borderRadius: '100%', backgroundColor: Colors.primaryShadow }}>
                  <Image
                    source={require('../assets/img/ic_send_primary.png')}
                    style={{ width: 40, height: 40 }} />
                </TouchableOpacity>
                <View style={{ width: 16 }}/>
                {doctorData.status === 'on-the-way' ?
                  <Button
                    onPress={() => navigation.navigate(...['DoctorDetails', {
                      params: {
                        doctorId: 1
                      }
                    }] as never)}
                    label='Lihat profil dokter'
                    buttonStyle={{
                      flex: 1,
                      borderRadius: 40
                    }}
                    labelStyle={{
                      fontFamily: 'Manrope-Bold',
                      fontSize: 20,
                      color: Colors.secondary,
                    }}/>
                  :
                  <Button
                    label='Lihat rincian biaya'
                    onPress={() => navigation.navigate(...['OrderDoctor', { screen: 'OrderDoctorSixthStep' }] as never)}
                    buttonStyle={{
                      flex: 1,
                      borderRadius: 40
                    }}
                    labelStyle={{
                      fontFamily: 'Manrope-Bold',
                      fontSize: 20,
                      color: Colors.secondary,
                    }}/>
                }
              </View>
            </View>
            <View style={{ height: 24 }} />
          </View>        
        </ShadowedView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    bottom: 150,
  },
  card: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.secondary,
    paddingTop: 32,
  },
  highlightText: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 16,
    color: Colors.primary,
  },
  smallBoldText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: Colors.textColor,
    includeFontPadding: false
  },
  boldText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    color: Colors.textColor,
    includeFontPadding: false
  },
  extraboldText: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 16,
    color: Colors.textColor,
    includeFontPadding: false
  },
  regularText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: Colors.textColor,
    includeFontPadding: false,
  },
  navbarContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: Colors.secondary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navbarTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: Colors.textColor,
    includeFontPadding: false,
  },
  navbarSubtitle: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: Colors.textColor,
    includeFontPadding: false,
  },
  navbarButton: {
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  navbarButtonLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
    color: Colors.primary,
    includeFontPadding: false,
  }
});

export default TrackDoctorScreen;