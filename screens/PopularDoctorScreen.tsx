import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Colors  from '../styles/colors';
import CategoryCard from '../components/CategoryCard';
import SearchBar from '../components/SearchBar';
import DoctorCard from '../components/DoctorCard';
import StackHeaderBar from '../components/StackHeaderBar';
import SessionStorage from 'react-native-session-storage';

const doctorData = {
  profile: require('../assets/img/placeholder_doctor.png'),
  name: 'Dr. Abdul',
  category: 'Dokter Umum',
  favorite: false,
  rating: 4.8,
  experience: 8
}

function PopularDoctorScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const categories = SessionStorage.getItem('@categories')?.slice(0, 4)
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<number>(0);

  useFocusEffect(React.useCallback(() => {
    if (SessionStorage.getItem('@selected_category') !== undefined) {
      setSelected(SessionStorage.getItem('@selected_category'))
    }
  }, []))

  function handlePressOnCategoryCard(index: number) {
    setSelected(index)
    SessionStorage.setItem('@selected_category', index)
  }

  return (
    <View style={[styles.screenContainer, { padding: 0 }]}>
      <StackHeaderBar
        label='Doktor Populer'
        containerStyle={{ padding: 24 }}
        labelStyle={{ marginLeft: 8, fontFamily: 'Manrope-Bold' }} />
      <View style={{ height: 54 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: styles.screenContainer.padding }}>
        <Text style={styles.title}>Kategori dokter</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('DoctorCategories' as never)}
          activeOpacity={0.75}>
          <Text style={styles.seeAll}>Lihat semua</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 38 }} />
      <View>
        <FlatList
          data={categories}
          renderItem={({ index, item }) => (
            <CategoryCard
              icon={item.icon}
              name={item.name}
              selected={selected === index}
              onPress={() => handlePressOnCategoryCard(index)} />
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          ListHeaderComponent={() => <View style={{ width: 24 }} />}
          ListFooterComponent={() => <View style={{ width: 24 }} />}
          />
      </View>
      <View style={{ height: 38 }} />
      <View style={{ paddingHorizontal: styles.screenContainer.padding }}>
        <SearchBar
          placeholder='Cari nama dokter...'
          value={search}
          onChangeText={setSearch} />
        <View style={{ height: 38 }} />
        <View style={{ flexDirection: 'row' }}>
          <DoctorCard data={doctorData} />
          <View style={{ width: 22 }} />
          <DoctorCard data={doctorData} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.secondary,
  },
  title: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 20,
    color: Colors.textColor,
  },
  seeAll: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    color: Colors.textColorSecondary,
    marginTop: 6,
  },
});

export default React.memo(PopularDoctorScreen);