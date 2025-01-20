import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors  from '../styles/colors';
import StackHeaderBar from '../components/StackHeaderBar';
import SessionStorage from 'react-native-session-storage';
import ReviewList from '../components/ReviewList';

interface ReviewData {
  userProfile: any,
  userName: string,
  rating: number,
  message: string,
}

function AboutScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const testimoni: ReviewData[] = SessionStorage.getItem('@testimoni')
  const highlightText = (text: string) => (
    <Text style={styles.highlight}>{text}</Text>
  )

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.screenContainer, { padding: 0 }]}>
      <View style={{ paddingHorizontal: styles.screenContainer.padding, paddingTop: styles.screenContainer.padding }}>
        <StackHeaderBar
          label='Kembali'
          labelStyle={{
            fontFamily: 'Manrope-Bold',
            fontSize: 16,
            color: Colors.textColor,
          }}/>
        <View style={{ height: 48 }} />
        <View
          style={[styles.banner, { backgroundColor: '#D42358', overflow: 'hidden', flexDirection: 'row', flex: 0 }]}>
          <View style={{ justifyContent: 'space-between', width: 200, paddingVertical: 4, }}>
            <Text style={[styles.bannerName, { color: Colors.textColorWhite }]}>Medique apa sih itu ?</Text>
            <Text style={[styles.bannerName, { color: Colors.textColorWhite, fontFamily: 'Manrope-Medium' }]} >yuk! kita kenal medique lebih dalam!</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image source={require('../assets/img/home_doctor_medic.png')}
              style={{
                width: 142, height: 142, marginVertical: -16
              }} />
          </View>
        </View>
        <View style={{ height: 24 }} />
        <Text style={styles.title}>Apa itu Medique?</Text>
        <View style={{ height: 12 }} />
        <Text style={styles.content}>{highlightText('Medique')} adalah aplikasi mobile inovatif yang dirancang untuk memudahkan Anda dalam mengakses layanan kesehatan. Dengan Medique, Anda tidak perlu lagi menghabiskan waktu berharga untuk mengantri di rumah sakit. Cukup pesan dokter melalui aplikasi, dan dapatkan perawatan yang Anda butuhkan dengan cepat dan efisien. Selain itu, kami juga menyediakan layanan ambulans untuk keadaan darurat, sehingga Anda tidak perlu bingung mencari ambulans saat dibutuhkan.</Text>
        <View style={{ height: 24 }} />
        <Text style={styles.title}>Layanan yang Disediakan</Text>
        <View style={{ height: 12 }} />
        <View
          style={[styles.banner, { backgroundColor: '#F8CE46', overflow: 'hidden', flexDirection: 'row', flex: 0 }]}>
          <View style={{ justifyContent: 'space-between', width: 200, paddingVertical: 4, }}>
            <Text style={styles.bannerName}>Layanan Ambulans cepat</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image source={require('../assets/img/home_ambulance.png')}
              style={{
                width: 130, height: 69, marginVertical: -4, transform: [{ scaleX: -1 }]
              }} />
          </View>
        </View>
        <View style={{ height: 12 }} />
        <Text style={styles.content}>Dalam {highlightText('keadaan darurat')}, Anda dapat dengan mudah {highlightText('memesan ambulans')} hanya dengan {highlightText('beberapa klik')}. Tidak perlu khawatir mencari ambulans lagi, karena kami siap membantu Anda {highlightText('kapan saja')} dan {highlightText('di mana saja!')}</Text>
        <View style={{ height: 12 }} />
        <View
          style={[styles.banner, { backgroundColor: Colors.primary, overflow: 'hidden', flexDirection: 'row', flex: 0, paddingVertical: 0 }]}>
          <View style={{ justifyContent: 'space-between', width: 180, paddingVertical: 24, }}>
            <Text style={[styles.bannerName, { color: Colors.textColorWhite }]}>Pesan Dokter Tanpa Antri</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
            <Image source={require('../assets/img/home_doctor.png')}
              style={{
                width: 82, height: 94
              }} />
          </View>
        </View>
        <View style={{ height: 12 }} />
        <Text style={styles.content}>{highlightText('Akses cepat')} ke dokter yang Anda butuhkan, {highlightText('kapan saja')} dan {highlightText('di mana saja')}. Dengan Medique, Anda bisa {highlightText('membuat janji temu tanpa antrian')}, sehingga {highlightText('perawatan kesehatan')} Anda menjadi lebih {highlightText('mudah')} dan {highlightText('efisien')}</Text>
        <View style={{ height: 32 }} />
        <Text style={styles.title}>Testimoni Pengguna</Text>
      </View>
      <View>
        <ReviewList
          data={testimoni}
          paddingVertical={12}
          paddingHorizontal={styles.screenContainer.padding}
          footerHeight={150} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: Colors.secondary,
  },
  banner: {
    flex: 1,
    borderRadius: 15,
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  bannerName: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: Colors.textColor,
    includeFontPadding: false,
  },
  title: {
    fontFamily: 'Manrope-Bold',
    fontSize: 24,
    color: Colors.textColor,
    includeFontPadding: false,
  },
  content: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: Colors.textColor,
    includeFontPadding: false,
    textAlign: 'justify',
  },
  highlight: {
    fontFamily: 'Manrope-Bold'
  },
});

export default AboutScreen;