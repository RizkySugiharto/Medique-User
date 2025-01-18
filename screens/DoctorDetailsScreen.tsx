import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
  useWindowDimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors  from '../styles/colors';
import StackHeaderBar from '../components/StackHeaderBar';
import { Rating } from '@kolking/react-native-rating';
import Button from '../components/Button';
import { ShadowedView, shadowStyle } from 'react-native-fast-shadow';

const doctorData = {
  profile: require('../assets/img/placeholder_doctor.png'),
  name: 'Dr. Abdul',
  category: 'Dokter Umum',
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
}

const reviewsData = [
  {
    userProfile: require('../assets/img/placeholder_user.png'),
    userName: 'Bang Jhon',
    rating: 4,
    message: "Dr. Abdul adalah dokter luar biasa! Beliau tidak hanya mengobati, tetapi juga memahami kondisi anak saya dengan penuh kasih. Penjelasannya selalu jelas dan membuat kami merasa tenang. Sangat direkomendasikan untuk keluarga mana pun!"
  },
  {
    userProfile: require('../assets/img/placeholder_user.png'),
    userName: 'Bang Jhon',
    rating: 4,
    message: "Dr. Abdul adalah dokter luar biasa! Beliau tidak hanya mengobati, tetapi juga memahami kondisi anak saya dengan penuh kasih. Penjelasannya selalu jelas dan membuat kami merasa tenang. Sangat direkomendasikan untuk keluarga mana pun!"
  },
]

function DoctorDetailsScreen(): React.JSX.Element {
  const navigation = useNavigation();
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
            containerStyle={{ paddingTop: 24 }}
            labelStyle={{ marginLeft: 8, fontFamily: 'Manrope-Bold' }} />
          <View style={{ height: 30 }} />
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.profileContainer}>
              <Image source={require('../assets/img/placeholder_doctor.png')} style={styles.profile} />
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
          <FlatList
            data={reviewsData}
            scrollEnabled={false}
            renderItem={({ index, item }) => (
              <ShadowedView
                style={shadowStyle({
                  opacity: 1,
                  offset: [0, 3],
                  color: 'rgba(0, 0, 0, 0.1)',
                  radius: 8
                })}>
                <View style={styles.reviewCard}>
                  <Rating
                    variant='stars-outline'
                    fillColor='rgb(253, 210, 100)'
                    baseColor='rgb(253, 210, 100)'
                    size={20}
                    rating={item.rating}
                    maxRating={5}
                    disabled={true}/>
                  <View style={{ height: 14 }} />
                  <Text style={styles.reviewMessage}>{item.message}</Text>
                  <View style={{ height: 14 }} />
                  <View>
                    <View style={styles.reviewUserProfileContainer}>
                      <Image source={item.userProfile} style={styles.reviewUserProfile} />
                    </View>
                    <View style={{ width: 14 }} />
                    <Text style={styles.reviewUserName}>{item.userName}</Text>
                  </View>
                </View>
              </ShadowedView>
            )}
            ItemSeparatorComponent={() => <View style={{ height: 12 }}/>}
            ListFooterComponent={() => <View style={{ height: 120 }} />}
            contentContainerStyle={{
              paddingHorizontal: styles.screenContainer.paddingHorizontal,
              paddingVertical: 16,
            }}
            />
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
            onPress={() => navigation.navigate('OrderDoctor' as never)}
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
  reviewCard: {
    padding: 20,
    backgroundColor: Colors.secondary,
    borderRadius: 9,
  },
  reviewMessage: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: Colors.textColor,
    includeFontPadding: false,
  },
  reviewUserProfileContainer: {
    borderRadius: '100%',
  },
  reviewUserProfile: {
    width: 50,
    height: 50,
  },
  reviewUserName: {
    fontFamily: 'Manrope-Semibold',
    fontSize: 18,
    color: Colors.textColor,
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