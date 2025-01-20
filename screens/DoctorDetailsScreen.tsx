import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Colors  from '../styles/colors';
import StackHeaderBar from '../components/StackHeaderBar';
import Button from '../components/Button';
import ReviewList from '../components/ReviewList';
import SessionStorage from 'react-native-session-storage';
import { CategoryData, DoctorData } from '../types';


function DoctorDetailsScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const route: RouteProp<{
    params: DoctorData
  }, 'params'> = useRoute()
  const doctorData = {...route.params}
  const reviewsData = SessionStorage.getItem('@reviews')
  const window = useWindowDimensions();
  const awardCardSpacing = 10;
  const awardCardWidth = (window.width - (styles.screenContainer.paddingHorizontal * 2)) / 2 - awardCardSpacing
  const [favorite, setFavorite] = useState(doctorData.favorite)

  function handleFavorite() {
    doctorData.favorite = !doctorData.favorite
    setFavorite(doctorData.favorite)
  }

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.screenContainer, { paddingHorizontal: 0 }]}>
        <View style={{ paddingHorizontal: styles.screenContainer.paddingHorizontal }}>
          <StackHeaderBar
            label='Kembali'
            notificationEnabled={true}
            rootStyle={{ paddingTop: 24 }}
            labelStyle={{ marginLeft: 8, fontFamily: 'Manrope-Bold' }} />
          <View style={{ height: 30 }} />
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.profileContainer}>
              <Image source={doctorData.profile} style={styles.profile} />
            </View>
            <View style={{ width: 14 }} />
            <View style={{ justifyContent: 'space-between', flex: 1 }}>
              <Text style={styles.doctorName} numberOfLines={1}>{doctorData.name}</Text>
              <Text style={styles.doctorDetail} numberOfLines={2}>{doctorData.details.address} ({doctorData.category})</Text>
            </View>
          </View>
          <View style={{ height: 20 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={[styles.awardCard, { width: awardCardWidth, backgroundColor: 'rgb(216, 250, 217)' }]}>
              <View style={[styles.awardIconContainer, { backgroundColor: 'rgb(73, 172, 79)' }]}>
                <Image source={require('../assets/img/ic_awards.png')} />
              </View>
              <View style={{ width: 14 }} />
              <View style={{ justifyContent: 'space-between' }}>
                <Text style={styles.awardValue}>{doctorData.experience} Tahun</Text>
                <Text style={styles.awardName}>Pengalaman</Text>
              </View>
            </View>
            <View style={[styles.awardCard, { width: awardCardWidth, backgroundColor: 'rgb(250, 236, 201)' }]}>
              <View style={[styles.awardIconContainer, { backgroundColor: 'rgb(254, 186, 12)' }]}>
                <Image source={require('../assets/img/ic_awards.png')} />
              </View>
              <View style={{ width: 14 }} />
              <View style={{ justifyContent: 'space-between' }}>
                <Text style={styles.awardValue}>{doctorData.details.patients}</Text>
                <Text style={styles.awardName}>Pasien</Text>
              </View>
            </View>
          </View>
          <View style={{ height: 30 }} />
          <Text style={styles.infoTitle}>Profile Dokter</Text>
          <View style={{ height: 16 }} />
          <Text style={styles.info}>{doctorData.details.description}</Text>
          <View style={{ height: 35 }} />
          <Text style={styles.infoTitle}>Jam Praktik</Text>
          <View style={{ height: 16 }} />
          <Text style={styles.info}>{doctorData.details.workingTime}</Text>
          <View style={{ height: 16 }} />
          <Text style={styles.infoTitle}>Harga Konsultasi</Text>
          <View style={{ height: 16 }} />
          <Text style={styles.info}>Pp. {doctorData.details.price.from} - Rp. {doctorData.details.price.to}</Text>
          <View style={{ height: 16 }} />
          <Text style={styles.infoTitle}>Review {doctorData.rating} ({doctorData.details.reviewCount})</Text>
        </View>
        <View>
          <ReviewList
            data={reviewsData}
            paddingHorizontal={styles.screenContainer.paddingHorizontal}/>
        </View>
      </ScrollView>
      <View style={{
        position: 'absolute',
        left: styles.screenContainer.paddingHorizontal,
        right: styles.screenContainer.paddingHorizontal,
        bottom: 30,
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => handleFavorite()}
            style={styles.favorite}>
            <Image source={favorite ?
              require('../assets/img/ic_favorite_filled.png') :
              require('../assets/img/ic_favorite_outline.png')
            } style={styles.favoriteIcon} />
          </TouchableOpacity>
          <View style={{ width: 24 }} />
          <Button
            onPress={() => {
              const categories: CategoryData[] = SessionStorage.getItem('@categories')
              SessionStorage.setItem('@selected_category', categories.filter(value => value.name === doctorData.category)[0])
              SessionStorage.setItem('@selected_doctor', doctorData)
              navigation.navigate('OrderDoctor' as never)
            }}
            label='Pesan Sekarang'
            buttonStyle={{ flex: 1, borderRadius: 42 }}
            />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    backgroundColor: Colors.secondary,
  },
  profileContainer: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  profile: {
    width: 90,
    height: 90,
  },
  doctorName: {
    fontFamily: 'Manrope-Semibold',
    fontSize: 24,
    color: Colors.textColor,
    includeFontPadding: false,
  },
  doctorDetail: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: Colors.textColor,
    includeFontPadding: false,
    flexGrow: 0,
    flexShrink: 1,
    flex: 1,
  },
  awardCard: {
    padding: 8,
    borderRadius: 15,
    flexDirection: 'row',
  },
  awardIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '100%',
  },
  awardValue: {
    fontFamily: 'Manrope-Semibold',
    fontSize: 16,
    color: Colors.textColor,
    includeFontPadding: false,
  },
  awardName: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    color: Colors.textColor,
    includeFontPadding: false,
  },
  infoTitle: {
    fontFamily: 'Manrope-Semibold',
    fontSize: 16,
    color: Colors.textColor,
    includeFontPadding: false,
  },
  info: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: Colors.textColorSecondary,
    includeFontPadding: false,
  },
  favorite: {
    padding: 20,
    backgroundColor: 'rgb(216, 225, 253)',
    borderRadius: '100%',
    overflow: 'hidden',
  },
  favoriteIcon: {
    width: 32,
    height: 32,
  }
});

export default DoctorDetailsScreen;