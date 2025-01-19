import React, { createRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  useWindowDimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors  from '../styles/colors';
import StepsHeaderBar from '../components/StepsHeaderBar';
import Button from '../components/Button';
import SessionStorage from 'react-native-session-storage';
import MapView, { Marker } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import { ShadowedView, shadowStyle } from 'react-native-fast-shadow';

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

function OrderAmbulanceSelectScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const nearbyAmbulances = SessionStorage.getItem('@nearby_ambulances');
  const [ambulances, setAmbulances] = useState<AmbulanceData[]>(nearbyAmbulances)
  const [selected, setSelected] = useState<AmbulanceData>(ambulances[0])
  const map = createRef<MapView>();
  const ambulanceList = createRef<FlatList>();
  const currentLoc = SessionStorage.getItem('@current_location');
  const numFormat = Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  })
  
  return (
    <View style={styles.screenContainer}>
      <MapView
        key='OrderAmbulanceSelectScreen'
        ref={map}
        zoomEnabled={true}
        rotateEnabled={true}
        onMapLoaded={() => {
          map.current?.setCamera({
            center: {
              latitude: currentLoc.lat,
              longitude: currentLoc.lng
            },
            pitch: 1,
            zoom: 20,
            heading: 1,
          })
        }}
        style={styles.map}
        >
        <Marker
          coordinate={{
            latitude: currentLoc.lat,
            longitude: currentLoc.lng
          }}
          icon={require('../assets/img/ic_map_marker.png')}/>
        {ambulances.map((value, index) => (
          <Marker
            key={'ambulance-' + index}
            onPress={() => {
              ambulanceList.current?.scrollToIndex({
                index,
                animated: true
              })
              setSelected(value)
            }}
            coordinate={{
              latitude: value.location.lat,
              longitude: value.location.lng
            }}
            icon={require('../assets/img/ic_ambulance.png')}/>
        ))}
      </MapView>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View />
        <ShadowedView
          style={shadowStyle({
            color: 'rgba(0, 0, 0, 0.25)',
            offset: [0, 4],
            radius: 20,
            opacity: 1,
          })}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexShrink: 1 }}>
                  <Text style={styles.message}>Lokasimu saat ini</Text>
                </View>
                <Button
                  label='Edit'
                  onPress={() => navigation.canGoBack() && navigation.goBack()}
                  buttonStyle={styles.edit}
                  labelStyle={styles.editLabel}/>
              </View>
              <View style={{ height: 6 }} />
              <Text style={styles.address}>Jalan Jombang Raya</Text>
            </View>
            <View style={{ height: 210, width: '100%' }}>
              <FlatList
                ref={ambulanceList}
                data={ambulances}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => {
                      map.current?.setCamera({
                        center: {
                          latitude: item.location.lat,
                          longitude: item.location.lng
                        },
                        pitch: 1,
                        heading: 1,
                      })
                      setSelected(item)
                    }}
                    activeOpacity={0.8}
                    style={[styles.ambulance, item == selected && styles.ambulanceSelected]}>
                    <View style={{ flexShrink: 1 }}>
                      <Text style={styles.name}>{item.name}</Text>
                      <View style={{ height: 2 }} />
                      <Text style={styles.price}>{numFormat.format(item.price)}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Image source={require('../assets/img/ic_ambulance.png')} />
                    </View>
                  </TouchableOpacity>
                )}
                />
            </View>
            <View style={{
              paddingHorizontal: 24,
              paddingTop: 12,
              paddingBottom: 24,
              backgroundColor: Colors.secondary,
            }}>
              <Button
                label='Pilih'
                onPress={() => navigation.navigate(...['OrderAmbulanceDetail', selected] as never)}
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
  contentContainer: {
    flexGrow: 1,
    backgroundColor: Colors.secondary,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    bottom: 180,
  },
  card: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.secondary,
    paddingTop: 24,
  },
  cardHeader: {
    paddingHorizontal: 24,
    paddingBottom: 10,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 2,
  },
  message: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 16,
    includeFontPadding: false,
    color: 'rgb(0, 0, 0)',
  },
  address: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    includeFontPadding: false,
    color: 'rgb(0, 0, 0)',
  },
  name: {
    fontFamily: 'Manrope-Bold',
    fontSize: 15,
    includeFontPadding: false,
    color: 'rgb(0, 0, 0)',
  },
  price: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    includeFontPadding: false,
    color: 'rgb(0, 0, 0)',
  },
  edit: {
    borderColor: Colors.primary,
    borderWidth: 2,
    paddingHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: Colors.secondary,
  },
  editLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: Colors.primary,
    includeFontPadding: false,
  },
  ambulance: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ambulanceSelected: {
    backgroundColor: Colors.primaryShadow,
  }
});

export default OrderAmbulanceSelectScreen;