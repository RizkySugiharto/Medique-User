import React, { SetStateAction, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import Colors  from '../styles/colors';
import { CategoryData } from '../types';
import SessionStorage from 'react-native-session-storage';
import Button from './Button';

interface FilterCategory {
  icon: any,
  name: string,
  selected: boolean,
}

interface Props {
  visible: boolean,
  setVisible: React.Dispatch<SetStateAction<boolean>>,
  onApply: (categories: FilterCategory[], isFiltering: boolean) => void
}

function CategoriesFilterModal({ visible, setVisible, onApply }: Props): React.JSX.Element {
  const [categories, setCategories] = useState<FilterCategory[]>(SessionStorage.getItem('@categories').map((value: CategoryData) => ({...value, selected: false})) || [])
  const [filterCount, setFilterCount] = useState(0);
  
  return (
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
        <TouchableOpacity
          onPress={() => {
            const newCategories = [...categories]
            categories.map((value, index) => {
              newCategories[index].selected = false
            })
            setFilterCount(0)
            setCategories(newCategories)
          }}
          activeOpacity={0.6}>
          <Text style={{
            fontFamily: 'Manrope-ExtraBold',
            fontSize: 14,
            color: Colors.primary,
            includeFontPadding: false,
          }}>Reset</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 16 }} />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: 12 }}>
        {categories.map(( value, index ) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              const newCategories = [...categories]
              newCategories[index].selected = !newCategories[index].selected
              setFilterCount(newCategories[index].selected ? filterCount + 1 : filterCount - 1)
              setCategories(newCategories)
            }}
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
          onApply(categories, filterCount > 0)
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
  );
}

const styles = StyleSheet.create({
});

export default CategoriesFilterModal;