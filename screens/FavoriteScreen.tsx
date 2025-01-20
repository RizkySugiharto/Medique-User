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
  const [filterCount, setFilterCount] = useState(0);
  const [favoritedDoctors, setFavoritedDoctors] = useState<DoctorData[] | []>(getFavotedDoctors())
  const [search, setSearch] = useState('');
  const toggleSelectedCategories = (index: number) => {
    const newCategories = [...categories]
    newCategories[index].selected = !newCategories[index].selected
    setFilterCount(newCategories[index].selected ? filterCount + 1 : filterCount - 1)
    setCategories(newCategories)
  }

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
          <View style={{
            backgroundColor: Colors.secondary,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 24,
            paddingTop: 12,
          }}>
            <View style={{
              width: 42,
              height: 6,
              borderRadius: 10,
              alignSelf: 'center',
              backgroundColor: Colors.textColorSecondary,
            }} />
            <View style={{ height: 24 }} />
            <Text style={{
              fontFamily: 'Manrope-Regular',
              fontSize: 12,
              color: '#555E67',
              includeFontPadding: false,
            }}>Filter berdasarkan</Text>
            <View style={{ height: 20 }} />
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{
                fontFamily: 'Manrope-ExtraBold',
                fontSize: 16,
                color: '#31373D',
                includeFontPadding: false,
              }}>Kategory dokter</Text>
              <Text style={{
                fontFamily: 'Manrope-ExtraBold',
                fontSize: 14,
                color: Colors.primary,
                includeFontPadding: false,
              }}>Reset</Text>
            </View>
            <View style={{ height: 16 }} />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: 12 }}>
              {categories.map(( value, index ) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => toggleSelectedCategories(index)}
                  activeOpacity={0.8}
                  style={[{
                    borderRadius: 12,
                    borderColor: Colors.textColorSecondary,
                    borderWidth: 1,
                    backgroundColor: Colors.secondary,
                    padding: 14,
                    marginBottom: 16,
                    flexGrow: 1,
                  }, value.selected && {
                    backgroundColor: Colors.primaryShadow,
                  }]}>
                  <Text style={{
                    fontFamily: 'Manrope-ExtraBold',
                    fontSize: 11,
                    color: '#555E67',
                    includeFontPadding: false,
                    textAlign: 'center',
                  }}>{value.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={{ height: 28 }} />
            <Button
              label={`Terapkan filter (${filterCount})`}
              onPress={() => {
                setVisible(false)
              }}
              buttonStyle={{ borderRadius: 8 }}
              labelStyle={{
                fontFamily: 'Manrope-ExtraBold',
                fontSize: 14,
                color: Colors.secondary,
                includeFontPadding: false,
              }}
              />
              <View style={{ height: 32 }} />
          </View>
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
          filterCount > 0 ?
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