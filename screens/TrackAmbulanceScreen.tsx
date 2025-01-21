import React, { createRef, ReactElement, ReactNode, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Colors  from '../styles/colors';
import Button from '../components/Button';
import MapView, { Marker } from 'react-native-maps';
import { ShadowedView, shadowStyle } from 'react-native-fast-shadow';
import SessionStorage from 'react-native-session-storage';
import utils from '../utils';

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

interface NavbarStatusViewProps {
  data: AmbulanceData,
  track: TrackStatus, 
}

function getAmbulanceData(): AmbulanceData { return SessionStorage.getItem('@selected_ambulance') }
function getAmbulanceTrack(): TrackStatus { return SessionStorage.getItem('@selected_ambulance_track') }

function NavbarStatusView({ data, track }: NavbarStatusViewProps): ReactNode | ReactElement {
  const navigation = useNavigation();
  const iconSize: ImageStyle = {
    width: 50,
    height: 26,
  }
  const handlePay = () => {
    navigation.navigate('OrderAmbulanceFinished' as never)
  }

  if (track.status === 'on-the-way') {
    return (
      <View style={styles.navbarContainer}>
        <Image
          source={require('../assets/img/ic_ambulance.png')}
          style={iconSize}/>
        <View style={{ justifyContent: 'center' }}>
          <Text style={styles.navbarTitle} numberOfLines={1}>Lacak ambulans</Text>
          <View style={{ height: 2 }} />
          <Text style={styles.navbarSubtitle} numberOfLines={1}>{data.address}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('TrackAmbulance' as never)}
          activeOpacity={0.5}
          style={styles.navbarButton}>
          <Text style={styles.navbarButtonLabel}>Lacak</Text>
        </TouchableOpacity>
      </View>
    )
  } else if (track.status === 'has-arrived') {
    return (
      <View style={styles.navbarContainer}>
        <Image
          source={require('../assets/img/ic_ambulance.png')}
          style={iconSize}/>
        <View style={{ justifyContent: 'center' }}>
          <Text style={styles.navbarTitle} numberOfLines={1}>Ambulans sudah sampai</Text>
          <View style={{ height: 2 }} />
          <Text style={styles.navbarSubtitle} numberOfLines={1}>{data.address}</Text>
        </View>
      </View>
    )
  } else if (track.status === 'to-the-hospital') {
    return (
      <View style={styles.navbarContainer}>
        <Image
          source={require('../assets/img/ic_ambulance.png')}
          style={iconSize}/>
        <View style={{ justifyContent: 'center' }}>
          <Text style={styles.navbarTitle} numberOfLines={1}>Menuju rumah sakit</Text>
          <View style={{ height: 2 }} />
          <Text style={styles.navbarSubtitle} numberOfLines={1}>{data.address}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('TrackAmbulance' as never)}
          activeOpacity={0.5}
          style={styles.navbarButton}>
          <Text style={styles.navbarButtonLabel}>Lacak</Text>
        </TouchableOpacity>
      </View>
    )
  } else if (track.status === 'finished') {
    return (
      <View style={styles.navbarContainer}>
        <Image
          source={require('../assets/img/ic_ambulance.png')}
          style={iconSize}/>
        <View style={{ justifyContent: 'center' }}>
          <Text style={styles.navbarTitle} numberOfLines={1}>Sudah selesai</Text>
          <View style={{ height: 2 }} />
          <Text style={styles.navbarSubtitle} numberOfLines={1}>{data.address}</Text>
        </View>
        <TouchableOpacity
          onPress={handlePay}
          activeOpacity={0.5}
          style={styles.navbarButton}>
          <Text style={styles.navbarButtonLabel}>Bayar</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function TrackAmbulanceScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const map = createRef<MapView>();
  const currentLoc = SessionStorage.getItem('@current_location');
  const ambulanceData = getAmbulanceData();
  const ambulanceTrack = getAmbulanceTrack();
  const [status, setStatus] = useState<'on-the-way' | 'has-arrived' | 'to-the-hospital' | 'finished'>(ambulanceTrack.status);
  const hightlights: Record<'on-the-way' | 'has-arrived' | 'to-the-hospital' | 'finished', string> = {
    'on-the-way': 'Ambulans segera menuju ke lokasi kamu',
    'has-arrived': 'Ambulans sudah sampai lokasi',
    'to-the-hospital': 'Ambulans menuju rumah sakit',
    'finished': 'Ambulans sudah sampai rumah sakit'
  }
  const handleChat = () => {
    navigation.navigate(...['Chat', { accountId: ambulanceData.id }] as never)
  }
  const onMapDisplay = () => {
    map.current?.setState({ isReady: true })
    map.current?.setCamera({
      center: {
        latitude: ambulanceData.location.lat,
        longitude: ambulanceData.location.lng
      },
      pitch: 1,
      zoom: 20,
      heading: 1,
    })
  }
  
  useEffect(() => {
    if (status === 'on-the-way') {
      const timeout = setTimeout(() => {
        ambulanceTrack.status = 'has-arrived';
        setStatus(ambulanceTrack.status)
        clearTimeout(timeout)
      }, 10_000 * 1)
    } else if (status === 'has-arrived') {
      const timeout = setTimeout(() => {
        ambulanceTrack.status = 'to-the-hospital';
        setStatus(ambulanceTrack.status)
        clearTimeout(timeout)
      }, 10_000 * 1)
    } else if (status === 'to-the-hospital') {
      const timeout = setTimeout(() => {
        ambulanceTrack.status = 'finished';
        setStatus(ambulanceTrack.status)
        clearTimeout(timeout)
      }, 10_000 * 1)
    } else if (status === 'finished') {
      SessionStorage.setItem('@navbar_status_view', undefined)
      navigation.navigate(...['OrderAmbulance', { screen: 'OrderAmbulanceFinished' }] as never) 
    }
  }, [status])

  SessionStorage.setItem('@navbar_status_view',
    <NavbarStatusView
      data={ambulanceData}
      track={ambulanceTrack} />
  )
  
  return (
    <View style={styles.screenContainer}>
      <MapView
        key='TrackAmbulanceScreen'
        ref={map}
        zoomEnabled={true}
        rotateEnabled={true}
        onMapLoaded={onMapDisplay}
        onLayout={onMapDisplay}
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
              <Text style={styles.highlightText}>{
                hightlights[ambulanceTrack.status]
              }</Text>
              <View style={{ height: 24 }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.boldText}>{ambulanceData.name}</Text>
                  <View style={{ height: 4 }} />
                  <Text style={styles.regularText}>{ambulanceData.address}</Text>
                </View>
                <Image source={require('../assets/img/ic_ambulance.png')} style={{ width: 92, height: 50 }} />
              </View>
            </View>
            <View style={{ height: 20 }} />
            <View style={{ height: 1, backgroundColor: Colors.textColorSecondary, width: '100%' }} />
            <View style={{ height: 20 }} />
            <View style={{ paddingHorizontal: 24 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../assets/img/ic_pin_time.png')} style={{ width: 24, height: 24 }} />
                <View style={{ width: 12 }} />
                <Text style={styles.extraboldText}>Tiba dalam {utils.timeToText(ambulanceTrack.time)}</Text>
              </View>
              <View style={{ height: 8 }} />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../assets/img/ic_pin_distance.png')} style={{ width: 24, height: 24 }} />
                <View style={{ width: 12 }} />
                <Text style={styles.regularText}>Jarak: {utils.distanceToText(ambulanceTrack.distance)}</Text>
              </View>
            </View>
            <View style={{
              paddingHorizontal: 24,
              paddingTop: 32,
              paddingBottom: 24,
              backgroundColor: Colors.secondary,
            }}>
              <Button
                label='Kirim chat ke ambulans'
                onPress={handleChat}
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

export default TrackAmbulanceScreen;