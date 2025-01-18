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


function DoctorCategories(): React.JSX.Element {
  const navigation = useNavigation();
  const categories = SessionStorage.getItem('@categories')
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
        renderItem={({ index, item }) => (
          <CategoryCard
            icon={item.icon}
            name={item.name}
            selected={selected === index}
            onPress={() => handlePressOnCategoryCard(index)} />
        )}
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