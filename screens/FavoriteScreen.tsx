import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Colors  from '../styles/colors';
import SearchBar from '../components/SearchBar';
import SessionStorage from 'react-native-session-storage';
import { FlatGrid } from 'react-native-super-grid';
import DoctorCard from '../components/DoctorCard';
import Button from '../components/Button';
import { CategoryData, DoctorData } from '../types';
import CategoriesFilterModal from '../components/CategoriesFilterModal';

interface FilterCategory {
  icon: any,
  name: string,
  selected: boolean,
}

function FavoriteScreen(): React.JSX.Element {
  const getFavotedDoctors = () => {
    return SessionStorage.getItem('@doctors').filter(
      (value: DoctorData) => value.favorite
    )
  }
  const navigation = useNavigation();
  const [categories, setCategories] = useState<FilterCategory[]>(SessionStorage.getItem('@categories').map((value: CategoryData) => ({...value, selected: false})) || [])
  const [isFiltering, setIsFiltering] = useState(false)
  const [favoritedDoctors, setFavoritedDoctors] = useState<DoctorData[] | []>(getFavotedDoctors())
  const [search, setSearch] = useState('');

  useFocusEffect(() => {
    setFavoritedDoctors(getFavotedDoctors())
  })

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Dokter Favorit</Text>
      <View style={{ height: 36 }} />
      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder='Cari nama dokter favorit kamu'
        renderFilterContent={(visible, setVisible) => (
          <CategoriesFilterModal
            visible={visible}
            setVisible={setVisible}
            onApply={(categories, isFiltering) => {
              setCategories(categories)
              setIsFiltering(isFiltering)
            }} />
        )}
        renderFilter={(isFilter, setIsFilter) => (
          <TouchableOpacity
            onPress={() => setIsFilter(!isFilter)}
            activeOpacity={0.7}
            style={{ paddingRight: 10, paddingLeft: 12 }}>
            <Image
              source={require('../assets/img/ic_filter_search.png')}
              style={{ width: 32, height: 32 }} />
          </TouchableOpacity>
        )}
        />
      <View style={{ height: 8 }} />
      <FlatGrid
        data={
          isFiltering ?
          favoritedDoctors
            .filter((value) => {
              return categories
                .filter((value) => value.selected)
                .map((value) => value.name)
                .includes(value.category)
          })
          :
          favoritedDoctors
        }
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <DoctorCard
            key={item.name + index}
            data={item}
            onToggleFavorite={(isFavorite) => {
              if (!isFavorite) {
                const newFavorited = favoritedDoctors.slice(index, index + 1)
                setFavoritedDoctors(newFavorited)
                const doctors: DoctorData[] = SessionStorage.getItem('@doctors')
                doctors.map((value, index) => {
                  if (value.id === item.id) {
                    doctors[index].favorite = isFavorite
                  }
                })
                SessionStorage.setItem('@doctors', doctors)
              }
            }} />
        )}
        itemContainerStyle={{
          justifyContent: 'flex-start'
        }}
        additionalRowStyle={{
          justifyContent: 'space-between',
          paddingLeft: 0,
          paddingBottom: 18,
        }}
        ListHeaderComponent={() => <View style={{ height: 36 }} />}
        ListFooterComponent={() => <View style={{ height: 120 }} />}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center' }}>
            <Image source={require('../assets/img/empty_favorite.png')} />
            <View style={{ height: 18 }} />
            <Text style={{
              fontFamily: 'Manrope-Regular',
              fontSize: 16,
              color: Colors.textColor,
              includeFontPadding: false
            }}>Belum ada dokter favorit nih</Text>
          </View>
        )}/>
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
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    color: Colors.textColor,
    includeFontPadding: false,
  }
});

export default React.memo(FavoriteScreen);