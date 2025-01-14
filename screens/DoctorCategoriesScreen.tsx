import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FlatGrid, SimpleGrid } from 'react-native-super-grid';
import Colors  from '../styles/colors';
import CategoryCard from '../components/CategoryCard';
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

function DoctorCategories(): React.JSX.Element {
  const navigation = useNavigation();
  const [selected, setSelected] = useState<number[]>([]);

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
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.screenContainer}>
      <StackHeaderBar
        label='Kembali'
        containerStyle={{ paddingTop: 24 }}
        labelStyle={{ marginLeft: 8, fontFamily: 'Manrope-Bold' }} />
      <View style={{ height: 54 }} />
      <Text style={styles.title}>Kategori dokter</Text>
      <View style={{ height: 38 }} />
      <SimpleGrid
        listKey='categories'
        data={categories}
        additionalRowStyle={styles.rowCategories}
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
        />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    backgroundColor: Colors.secondary,
  },
  title: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 20,
    color: Colors.textColor,
  },
  rowCategories: {
    justifyContent: 'space-between',
    paddingLeft: 0,
    paddingBottom: 18,
  }
});

export default DoctorCategories;