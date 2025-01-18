import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors  from '../styles/colors';
import DoctorCard from '../components/DoctorCard';
import { format as formatDate } from 'date-fns';
import { id as idLocale } from 'date-fns/locale/id'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SearchBar from '../components/SearchBar';

const userData = {
  profile: require('../assets/img/placeholder_user.png'),
  name: 'Frendi',
}

const doctors = [
  {
    profile: require('../assets/img/placeholder_doctor.png'),
    name: 'Dr. Abdul',
    category: 'Dokter Umum',
    favorite: false,
    rating: 4.8,
    experience: 8,
  },
  {
    profile: require('../assets/img/placeholder_doctor.png'),
    name: 'Dr. Abdul',
    category: 'Dokter Umum',
    favorite: false,
    rating: 4.8,
    experience: 8,
  },
  {
    profile: require('../assets/img/placeholder_doctor.png'),
    name: 'Dr. Abdul',
    category: 'Dokter Umum',
    favorite: false,
    rating: 4.8,
    experience: 8,
  },
  {
    profile: require('../assets/img/placeholder_doctor.png'),
    name: 'Dr. Abdul',
    category: 'Dokter Umum',
    favorite: false,
    rating: 4.8,
    experience: 8,
  },
]

const articles = [
  {
    image: require('../assets/img/placeholder_article.png'),
    category: 'Covid-19',
    title: 'Kengerian gelombang kedua covid-19',
    publishDate: new Date(Date.now())
  },
  {
    image: require('../assets/img/placeholder_article.png'),
    category: 'Trend',
    title: 'Virus baru di Indo',
    publishDate: new Date(Date.now())
  },
]

function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.screenContainer, { padding: 0 }]}
      contentContainerStyle={{flexGrow: 1}}>
      <View style={{ paddingHorizontal: styles.screenContainer.padding, paddingTop: styles.screenContainer.padding }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Image source={require('../assets/img/placeholder_user.png')} style={styles.profile} />
            <View style={{ width: 16 }} />
            <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
              <Text style={styles.username}>Hi,Frendi</Text>
              <Text style={styles.greeting}>Selamat Sore!</Text>
            </View>
          </View>
          <View style={styles.notification}>
            <Image source={require('../assets/img/ic_notification.png')} />
          </View>
        </View>
        <View style={{height: 40}} />
        <SearchBar
          placeholder='Cari dokter, artikel...'
          value={search}
          onChangeText={setSearch} />
        <View style={{height: 28}} />
        <Text style={styles.title}>Layanan unggulan</Text>
        <View style={{height: 16}}/>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.service, { backgroundColor: '#F8CE46', justifyContent: 'flex-end' }]}>
            <Image source={require('../assets/img/home_ambulance.png')} />
            <Text style={[styles.serviceName, { paddingTop: 4 }]}>Ambulans</Text>
          </TouchableOpacity>
          <View style={{width: 16}}/>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('OrderDoctor' as never)}
            style={[styles.service, { backgroundColor: '#3A6AF4', justifyContent: 'flex-end', overflow: 'hidden' }]}>
            <Text style={[styles.serviceName, { color: Colors.textColorWhite, paddingTop: 4 }]}>Dokter</Text>
            <Image source={require('../assets/img/home_doctor.png')} style={{
              position: 'absolute',
              right: 0,
            }} />
          </TouchableOpacity>
        </View>
        <View style={{height: 16}} />
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.service, { backgroundColor: '#D42358', overflow: 'hidden', flexDirection: 'row', flex: 0 }]}>
          <View style={{ justifyContent: 'center', width: 200 }}>
            <Text style={[
              styles.serviceName,
              {
                color: Colors.textColorWhite,
                fontFamily: 'Manrope-Bold',
              }]}>
                Dapatkan Voucher Menarik untuk Layanan Kesehatan!
              </Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image source={require('../assets/img/home_doctor_medic.png')} style={{ height: 132, marginVertical: -10 }} />
          </View>
        </TouchableOpacity>
        <View style={{height: 32}} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>Dokter Populer</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('PopularDoctor' as never)}
            activeOpacity={0.75}>
            <Text style={styles.seeAll}>Lihat semua</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 20 }} />
      </View>
      <View>
        <FlatList
          data={doctors}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <DoctorCard data={item} />
          )}
          ItemSeparatorComponent={() => <View style={{ width: 24 }} />}
          ListHeaderComponent={() => <View style={{ width: 24 }} />}
          ListFooterComponent={() => <View style={{ width: 24 }} />}
          />
      </View>
      <View style={{ paddingHorizontal: styles.screenContainer.padding }}>
        <View style={{ height: 42 }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>Artikel trending</Text>
          <TouchableOpacity activeOpacity={0.75}>
            <Text style={styles.seeAll}>Lihat semua</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 26 }} />
      </View>
      <FlatList
        data={articles}
        renderItem={({ index, item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.articleCard}>
            <Image source={item.image} style={styles.articleImage}/>
            <View style={{ height: 12 }} />
            <Text style={styles.articleCategory}>{item.category}</Text>
            <View style={{ height: 6 }} />
            <Text style={styles.articleTitle}>{item.title}</Text>
            <View style={{ height: 16 }} />
            <Text style={styles.articleDate}>{formatDate(
              item.publishDate,
              'MMM, d y',
              { locale: idLocale })}</Text>
          </TouchableOpacity>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
        ListHeaderComponent={() =><View style={{ width: 24 }} /> }
        ListFooterComponent={() =><View style={{ width: 24 }} /> }
        />
      <View style={{ height: 160 }} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.secondary,
  },
  profile: {
    width: 70,
    height: 70,
    borderRadius: 1000,
  },
  username: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    color: Colors.textColor,
    includeFontPadding: false,
  },
  greeting: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: Colors.textColor,  
    includeFontPadding: false,
  },
  notification: {
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: '100%',
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
  },
  title: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    color: Colors.textColor,
  },
  service: {
    flex: 1,
    borderRadius: 15,
    padding: 12,
  },
  serviceName: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    color: Colors.textColor,
  },
  seeAll: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    color: Colors.textColorSecondary,
    marginTop: 6,
  },
  articleCard: {
    backgroundColor: Colors.secondary,
    padding: 6,
    borderRadius: 15,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    width: 250,
  },
  articleImage: {
    borderRadius: 12,
    width: '100%',
    height: 120,
  },
  articleCategory: {
    backgroundColor: Colors.primaryShadow,
    padding: 4,
    borderRadius: 4,
    color: Colors.primary,
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    alignSelf: 'flex-start',
  },
  articleTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: Colors.textColor,
  },
  articleDate: {
    fontFamily: 'Manrope-Regular',
    fontSize: 10,
    color: Colors.textColorSecondary,
  }
});

export default HomeScreen;