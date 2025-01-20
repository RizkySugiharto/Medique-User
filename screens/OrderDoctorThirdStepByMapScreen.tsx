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
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Colors  from '../styles/colors';
import StepsHeaderBar from '../components/StepsHeaderBar';
import Button from '../components/Button';
import SessionStorage from 'react-native-session-storage';
import MapView, { Marker } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import { ShadowedView, shadowStyle } from 'react-native-fast-shadow';
import { PlaceData } from '../types';

function OrderDoctorThirdStepByMapScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const nearbyPlaces = SessionStorage.getItem('@nearby_places');
  const [places, setPlaces] = useState<PlaceData[]>(nearbyPlaces)
  const [selected, setSelected] = useState<PlaceData>(places[0])
  const map = createRef<MapView>();
  const currentLoc = SessionStorage.getItem('@current_location');
  const carouselItemHeight = 110;
  const carouselSliderHeightPaddingVertical = 30;
  const carouselSliderHeight = carouselItemHeight + carouselSliderHeightPaddingVertical * 2;
  const currentCarousel = createRef<Carousel<PlaceData>>();
  const selectPlace = (place: PlaceData) => {
    setSelected(place)
    map.current?.setCamera({
      center: {
        latitude: place.location.lat,
        longitude: place.location.lng
      },
      pitch: 1,
      zoom: 20,
      heading: 1,
    })
  }

  useFocusEffect(() => {
    map.current?.forceUpdate()
  })
  
  return (
    <View style={styles.screenContainer}>
      <MapView
        key='OrderDoctorThirdStepByMapScreen'
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
        { places.map(( value, index ) => (
          <Marker
            key={'Place-' + index}
            coordinate={{
              latitude: value.location.lat,
              longitude: value.location.lng
            }}
            onPress={() => {
              currentCarousel.current?.snapToItem(index, true, true, false, true)
            }}
            icon={require('../assets/img/ic_map_marker.png')}/>
        )) }
        <Marker
          coordinate={{
            latitude: currentLoc.lat,
            longitude: currentLoc.lng
          }}
          icon={require('../assets/img/ic_current_location.png')}/>
      </MapView>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <StepsHeaderBar
          label='Pemesanan Dokter'
          message='Langkah ketiga: lokasi kamu dimana nih'
          step={3}
          maxSteps={7}/>
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
                  <Text style={styles.boldText}>Beri Tahu Dokter Lokasi Anda</Text>
                </View>
                <Button
                  label='Edit'
                  onPress={() => navigation.canGoBack() && navigation.goBack()}
                  buttonStyle={styles.edit}
                  labelStyle={styles.editLabel}/>
              </View>
              <View style={{ height: 6 }} />
              <Text style={styles.regularTextSmall}>Pilih titik lokasi strategis untuk memperlancar kunjungan dokter</Text>
            </View>
            <Carousel
              ref={currentCarousel}
              data={places}
              sliderHeight={carouselSliderHeight}
              itemHeight={carouselItemHeight}
              vertical={true}
              showsVerticalScrollIndicator={false}
              slideStyle={{ justifyContent: 'center', flexGrow: 1 }}
              inactiveSlideOpacity={0.35}
              enableSnap={true}
              enableMomentum={false}
              onBeforeSnapToItem={(index) => selectPlace(places[index])}
              decelerationRate='fast'
              onScrollEndDrag={(event) => {
                const offsetY = event.nativeEvent.contentOffset.y
                const newIndex = Math.round(offsetY / carouselItemHeight)
                selectPlace(places[newIndex])
                if (currentCarousel.current) {
                  currentCarousel.current.snapToItem(newIndex, true)
                }
              }}
              renderItem={({ item, index }) => (
                <View
                  style={[styles.place, item == selected && styles.placeSelected]}>
                    <Text style={styles.boldText}>{item.name}</Text>
                    <View style={{ height: 6 }} />
                    <Text style={styles.regularText}>{item.address}</Text>
                </View>
              )}
              />
            <View style={{ height: 100 }} />
            <Button
              label='Lanjut'
              onPress={() => navigation.navigate('OrderDoctorFourthStep' as never)}
              buttonStyle={{
                position: 'absolute',
                bottom: 30,
                left: 24,
                right: 24,
              }}
              />
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
    bottom: 150,
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
  boldText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    includeFontPadding: false,
    color: 'rgb(0, 0, 0)',
  },
  regularText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    includeFontPadding: false,
    color: 'rgb(0, 0, 0)',
  },
  regularTextSmall: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
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
  place: {
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  placeSelected: {
    backgroundColor: Colors.primaryShadow,
  }
});

export default OrderDoctorThirdStepByMapScreen;