import React, { useState, useEffect, useLayoutEffect } from 'react';
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

const categories = [
  {
    icon: require('../assets/img/ic_pediatrician_specialist.png'),
    name: 'Dokter Spesialis Anak',
  },
  {
    icon: require('../assets/img/ic_general_practitioners.png'),
    name: 'Dokter Umum',
  },
  {
    icon: require('../assets/img/ic_nutrition_specialist_doctor.png'),
    name: 'Dokter Spesialis Gizi',
  },
  {
    icon: require('../assets/img/ic_psychiatrist.png'),
    name: 'Psikiater',
  },
  {
    icon: require('../assets/img/ic_ent_specialist_doctor.png'),
    name: 'Dokter Spesialis THT',
  },
  {
    icon: require('../assets/img/ic_rehabilitation_doctor.png'),
    name: 'Dokter Rehabilitasi',
  },
  {
    icon: require('../assets/img/ic_allergy_&_immunology_doctor.png'),
    name: 'Dokter Alergi & Imunologi',
  },
  {
    icon: require('../assets/img/ic_internal_medicine_specialist.png'),
    name: 'Dokter Spesialis Penyakit Dalam',
  },
]

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
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [search, setSearch] = useState('');

  useFocusEffect(React.useCallback(() => {
    if (SessionStorage.getItem('@selected_categories') !== undefined) {
      setSelected(SessionStorage.getItem('@selected_categories'))
    }
  }, []))

  function handlePressOnCategoryCard(index: number, isSelected: boolean) {
    let newSelected = isSelected ? selected.filter(value => value !== index) : [...selected, index]
    setSelected(newSelected)
    SessionStorage.setItem('@selected_categories', newSelected)
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
          renderItem={({ index, item }) => {
            const isSelected = selected.includes(index)
            return (
              <CategoryCard
                icon={item.icon}
                name={item.name}
                selected={isSelected}
                onPress={() => handlePressOnCategoryCard(index, isSelected)} />
            )
          }}
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

export default PopularDoctorScreen;