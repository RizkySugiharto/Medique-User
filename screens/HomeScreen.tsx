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
  email : "frendianton@gmail.com",
  notelp : '08123456789',
  alamat : 'jalan pesangonan kanan kiri dan kanan atas'
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
    content : [
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad molestias eaque mollitia fuga porro eius quasi pariatur qui hic adipisci sapiente nihil consequatur, nostrum nulla et a repellat quidem cum!",
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam, porro! Totam officia, adipisci vitae quo illo quos maiores hic, ipsam optio sit asperiores doloremque ab debitis commodi saepe voluptatem voluptates a rerum quod incidunt numquam nisi ullam. At error pariatur dolorum aut dolorem quaerat fugiat. Quas ad maxime aliquam inventore impedit at iure amet numquam molestiae! Consequatur quisquam quam veniam. Omnis repudiandae impedit facere cumque, minima ratione officia aliquam? Harum quas maiores, eaque accusamus maxime voluptatum, rem laboriosam id nesciunt unde ipsa tempora, voluptates reiciendis necessitatibus explicabo! Velit, minima autem.",
     " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae corrupti quidem hic, magni autem dolore? Nemo eius tempore corporis culpa praesentium delectus nisi molestias, alias modi? Explicabo eius molestiae nihil dignissimos? Dolore molestiae officiis dolorum cum, ipsa ex assumenda. Vero.",
    ],
    publishDate: new Date(1584691152 * 1000),
  },
  {
    image: require('../assets/img/placeholder_virus2025.png'),
    category: 'Kasus Flu A Dan HMPV',
    title: 'Kasus Flu A dan HMPV Membludak di Tiongkok, Belum Ditemukan di Indonesia',
    content : [
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque repudiandae ea nobis laudantium eaque dicta eum inventore asperiores, est eveniet sunt perspiciatis, laboriosam quaerat non natus molestias vel quibusdam tempora aspernatur explicabo deserunt maxime velit.",
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste nobis possimus quia, in distinctio unde hic illo at modi totam! Quisquam, asperiores quod. Esse quasi facere consequatur voluptatibus repellat voluptates molestiae iste assumenda inventore? Ex dicta ratione inventore possimus blanditiis iste, eveniet maiores esse, magni dignissimos quaerat. Enim, repellat adipisci. Quibusdam expedita quaerat reiciendis neque dolores!",
     " Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi labore esse corrupti praesentium rerum suscipit veniam soluta dolores, debitis sint, quod, excepturi delectus odit voluptates optio cupiditate eius ab blanditiis aut minima incidunt magnam modi. Quae perspiciatis earum explicabo quidem, officia cumque minima fuga soluta consectetur asperiores facilis aspernatur debitis dolores numquam ratione! Ullam quae fugiat officiis omnis repellat dolor commodi perferendis voluptatem saepe sit?",
     " Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, praesentium autem sunt, ab ratione dolorum minus saepe nemo, assumenda voluptas aut veritatis debitis possimus deserunt sequi velit. Ad, recusandae cupiditate exercitationem libero perspiciatis reprehenderit, sequi dolore quam soluta repellat illo sunt pariatur laboriosam accusantium itaque sed eligendi. Exercitationem excepturi sit nisi hic, ipsa et voluptas nobis omnis nemo tempore saepe. Earum sapiente veniam adipisci cum ipsam pariatur et mollitia incidunt ratione, amet cupiditate eveniet repellendus perferendis consectetur magni ipsa distinctio eius doloremque porro consequatur delectus laborum quasi. Sequi dignissimos voluptates aliquid possimus enim temporibus, laudantium neque vero ratione expedita exercitationem, culpa in nulla quaerat reiciendis assumenda praesentium iure fuga magnam. Quis neque in explicabo dignissimos, recusandae possimus consequatur officia ipsa ipsum odit accusamus amet ducimus sunt voluptatem quos cum voluptate quia assumenda voluptatibus, doloribus unde, architecto sed. Cumque consectetur quisquam pariatur. Ratione quia quas optio nihil vero aspernatur exercitationem aperiam adipisci tempore dolorum, amet atque labore fuga maxime ullam maiores enim tenetur sapiente veritatis doloremque. Laboriosam optio ea corporis esse. Temporibus voluptatum asperiores architecto quibusdam, rerum adipisci illum ab pariatur optio maxime delectus. Dolore harum consectetur recusandae necessitatibus amet aliquid ipsam nobis inventore, neque iste officia repellendus blanditiis odio labore.",
     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum esse doloribus eligendi exercitationem mollitia numquam, molestias recusandae voluptates. Animi, fugit!"
    ],
    publishDate: new Date(1735807058 * 1000)
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
          <TouchableOpacity activeOpacity={0.75} onPress={() => navigation.navigate(...['AllArticle',{articles}] as never)}>
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
            style={styles.articleCard}
            onPress={() => navigation.navigate(...['Article',{article : item}] as never)}
            >
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

export default React.memo(HomeScreen);