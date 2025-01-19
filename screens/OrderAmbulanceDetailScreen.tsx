import React, { createRef, ReactElement, ReactNode, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Colors  from '../styles/colors';
import Button from '../components/Button';
import MapView, { Marker } from 'react-native-maps';
import { ShadowedView, shadowStyle } from 'react-native-fast-shadow';
import SessionStorage from 'react-native-session-storage';

interface Location {
  lat: number,
  lng: number,
}

interface AmbulanceData {
  id: number,
  name: string,
  price: number,
  address: string,
  location: Location,
}

interface TrackStatus {
  status: 'on-the-way' | 'has-arrived' | 'to-the-hospital' | 'finished',
  location: Location,
  distance: 2_500,
  time: 300,
}

function OrderAmbulanceDetailScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const route: RouteProp<{
    params: AmbulanceData
  }, 'params'> = useRoute();
  const map = createRef<MapView>();
  const currentLoc = SessionStorage.getItem('@current_location');
  const ambulanceData = route.params;
  const numFormat = Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  })
  const handleOrder = () => {
    const ambulanceTrack: TrackStatus = {
      distance: 2_500,
      time: 300,
      status: 'on-the-way',
      location: ambulanceData.location,
    }
    SessionStorage.setItem('@selected_ambulance', ambulanceData)
    SessionStorage.setItem('@selected_ambulance_track', ambulanceTrack)
    navigation.navigate(...['OrderAmbulance', { screen: 'TrackAmbulance' }] as never)
  }
  
  return (
    <View style={styles.screenContainer}>
      <MapView
        key='OrderAmbulanceDetailScreen'
        ref={map}
        zoomEnabled={true}
        rotateEnabled={true}
        onMapLoaded={() => {
          map.current?.setCamera({
            center: {
              latitude: ambulanceData.location.lat,
              longitude: ambulanceData.location.lng
            },
            pitch: 1,
            zoom: 20,
            heading: 1,
          })
        }}
        style={styles.map}>
        <Marker
          coordinate={{
            latitude: ambulanceData.location.lat,
            longitude: ambulanceData.location.lng
          }}
          icon={require('../assets/img/ic_ambulance.png')}/>
        <Marker
          coordinate={{
            latitude: currentLoc.lat,
            longitude: currentLoc.lng
          }}
          icon={require('../assets/img/ic_map_marker.png')}/>
      </MapView>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View />
        <ShadowedView
          style={shadowStyle({
            color: 'rgba(0, 0, 0, 0.25)',
            opacity: 1,
            offset: [0, -4],
            radius: 20,
          })}>
          <View style={styles.card}>
            <View style={{ paddingHorizontal: 24 }}>
              <Text style={styles.highlightText}>Detail ambulans</Text>
              <View style={{ height: 28 }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.boldText}>{ambulanceData.name}</Text>
                  <View style={{ height: 4 }} />
                  <Text style={styles.regularText}>{ambulanceData.address}</Text>
                </View>
                <Image source={require('../assets/img/ic_ambulance.png')} style={{ width: 92, height: 50 }} />
              </View>
            </View>
            <View style={{ height: 24 }} />
            <View style={{ height: 1, backgroundColor: Colors.textColorSecondary, width: '100%' }} />
            <View style={{ height: 32 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 24 }}>
              <Image source={require('../assets/img/ic_cash.png')} />
              <View style={{ width: 16 }} />
              <Text style={styles.extraboldText}>{numFormat.format(ambulanceData.price)}</Text>
            </View>
            <View style={{
              paddingHorizontal: 24,
              paddingTop: 32,
              paddingBottom: 24,
              backgroundColor: Colors.secondary,
            }}>
              <Button
                label='Pesan ambulans'
                onPress={handleOrder}
                buttonStyle={{ borderRadius: 42, paddingVertical: 20 }}
                labelStyle={{
                  fontFamily: 'Manrope-Bold',
                  fontSize: 20,
                  color: Colors.secondary,
                  includeFontPadding: false,
                }}
                />
            </View>
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

export default OrderAmbulanceDetailScreen;