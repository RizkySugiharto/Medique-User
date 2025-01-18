import React, { useState } from 'react';
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
import StepsHeaderBar from '../components/StepsHeaderBar';
import LabeledInput from '../components/LabeledInput';
import Button from '../components/Button';
import SessionStorage from 'react-native-session-storage';
import ButtonWithIcon from '../components/ButtonWithIcon';
import utils from '../utils';

interface Location {
  lat: number,
  lng: number,
}

interface PlaceData {
  id: string,
  name: string,
  address: string,
  location: Location,
  distance: number
}

function OrderDoctorThirdStepScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<PlaceData | undefined>();
  const bookmarkedLocations = SessionStorage.getItem('@bookmarked_places')
  const [places, setPlaces] = useState<PlaceData[]>(bookmarkedLocations ? bookmarkedLocations : [])
  
  return (
    <View style={styles.screenContainer}>
      <StepsHeaderBar
        label='Pemesanan Dokter'
        message='Langkah ketiga: lokasi kamu dimana nih'
        step={3}
        maxSteps={7}/>
      <View style={{ height: 12, opacity: 0 }} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.contentContainer}>
        <View style={{ paddingHorizontal: 24 }}>
          <View style={{ height: 20, opacity: 0 }} />
          <Text style={styles.message}>Set lokasi kamu</Text>
          <View style={{ height: 10 }} />
          <LabeledInput
            value={search}
            setValue={setSearch}
            placeholder='Cari lokasi kamu'
            inputStyle={styles.inputText}
            renderLeft={() => (
              <TouchableOpacity
                onPress={() => setPlaces(SessionStorage.getItem('@search_places'))}
                style={styles.search}
                activeOpacity={0.65}>
                <Image source={require('../assets/img/ic_map_marker.png')} style={styles.searchIcon} />
              </TouchableOpacity>
            )}
            />
          <View style={{ height: 18 }} />
          <ButtonWithIcon
            icon={require('../assets/img/ic_map.png')}
            label='Pilih lewat peta'
            activeOpacity={0.5}
            onPress={() => navigation.navigate('OrderDoctorThirdStepByMap' as never)}
            buttonStyle={styles.selectMap}
            iconStyle={styles.selectMapIcon}
            labelStyle={styles.selectMapLabel}/>
          <View style={{ height: 18 }} />
        </View>
        <FlatList
          scrollEnabled={false}
          data={places}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelected(item)}
              activeOpacity={0.75}
              style={[styles.placeCard, selected === item && styles.placeCardOnSelected]}>
              <View style={styles.placeBodyLeft}>
                <Image source={require('../assets/img/ic_map_time.png')} style={styles.placeDistanceIcon}/>
                <Text style={styles.placeDistanceText}>{utils.distanceToText(item.distance)}</Text>
              </View>
              <View style={styles.placeBodyCenter}>
                <Text style={styles.placeName}>{item.name}</Text>
                <Text style={styles.placeAddress}>{item.address}</Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.65}
                style={styles.placeBodyRight}>
                <Image source={require('../assets/img/ic_bookmark.png')} style={styles.placeBookmark}/>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          />
        <View style={{ height: 100 }} />
      </ScrollView>
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
  inputText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    includeFontPadding: false,
    paddingRight: 20,
    alignSelf: 'center',
  },
  message: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 16,
    includeFontPadding: false,
    color: Colors.textColor,
  },
  search: {
    paddingRight: 8,
    paddingVertical: 6,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  searchIcon: {
    width: 40,
    height: 40,
  },
  selectMap: {
    alignSelf: 'flex-end',
    borderColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  selectMapLabel: {
    fontFamily: 'Manrope-Regular',
    fontSize: 13,
    color: Colors.primary,
    includeFontPadding: false,
    paddingLeft: 10,
  },
  selectMapIcon: {
    width: 28,
    height: 28,
  },
  placeCard: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderColor: Colors.textColorSecondary,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  placeCardOnSelected: {
    backgroundColor: Colors.primaryShadow,
  },
  placeBodyLeft: {
    paddingRight: 20,
    alignItems: 'center',
  },
  placeDistanceIcon: {
    width: 36,
    height: 36,
    marginBottom: 4
  },
  placeDistanceText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    color: Colors.textColorSecondary,
    includeFontPadding: false,
  },
  placeBodyCenter: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 2,
  },
  placeName: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: Colors.textColor,
    marginBottom: 4,
    includeFontPadding: false,
  },
  placeAddress: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    color: Colors.textColor,
    includeFontPadding: false,
  },
  placeBodyRight: {
    flexBasis: 42,
    alignItems: 'center'
  },
  placeBookmark: {
    width: 20,
    height: 20
  },
  placeNoneText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    includeFontPadding: false,
    color: Colors.textColor,
    paddingHorizontal: 24,
  },
});

export default OrderDoctorThirdStepScreen;