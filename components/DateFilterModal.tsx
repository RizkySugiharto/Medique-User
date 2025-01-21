import React, { SetStateAction, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import Colors  from '../styles/colors';
import { CategoryData } from '../types';
import SessionStorage from 'react-native-session-storage';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfToday, endOfToday, format } from 'date-fns'
import Button from './Button';

interface FilterDate {
  label: string,
  from: Date,
  to: Date,
  selected: boolean
}

interface Props {
  visible: boolean,
  setVisible: React.Dispatch<SetStateAction<boolean>>,
  onApply: (categories: FilterDate[], isFiltering: boolean) => void
}

function dateToString(date: Date): string {
  return format(date, 'dd-MM-YYYY')
}

function CategoriesFilterModal({ visible, setVisible, onApply }: Props): React.JSX.Element {
  const [dates, setDates] = useState<FilterDate[]>([
    {
      label: 'Hari Ini',
      from: startOfToday(),
      to: endOfToday(),
      selected: false
    },
    {
      label: 'Minggu Ini',
      from: startOfWeek(new Date),
      to: endOfWeek(new Date),
      selected: false
    },
    {
      label: 'Bulan Ini',
      from: startOfMonth(new Date),
      to: endOfMonth(new Date),
      selected: false
    },
  ])
  const [filterCount, setFilterCount] = useState(0);
  const [fromDate, setFromDate] = useState(startOfToday());
  const [toDate, setToDate] = useState(endOfToday());
  const window = useWindowDimensions()
  const paddingHorizontal = 24;
  const minSpace = 8;
  const halfWidth = (window.width - paddingHorizontal) / 2 - paddingHorizontal * 2 - minSpace
  const halfThreeWidth = (window.width - paddingHorizontal) / 3 - paddingHorizontal * 2 - minSpace
  
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
        }}>Rentang Tanggal</Text>
        <TouchableOpacity
          onPress={() => {
            const newDates = [...dates]
            dates.map((value, index) => {
              newDates[index].selected = false
            })
            setFilterCount(0)
            setDates(newDates)
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexBasis: halfWidth }}>
          <Text style={styles.bold}>Dari</Text>
          <View style={{ height: 8 }} />
          <View style={[styles.box, {
            backgroundColor: 'rgb(240, 240, 240)',
            padding: 4,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }]}>
            <Text style={styles.extrabold}>{dateToString(fromDate)}</Text>
          </View>
        </View>
        <View style={{ flexBasis: halfWidth }}>
          <Text style={styles.bold}>Dari</Text>
          <View style={{ height: 8 }} />
          <View style={[styles.box, {
            backgroundColor: 'rgb(240, 240, 240)',
            padding: 4,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }]}>
            <Text style={styles.extrabold}>{dateToString(toDate)}</Text>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      {dates.map((value, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            const newDates = [...dates]
            newDates[index].selected = !newDates[index].selected
            setFilterCount(newDates[index].selected ? filterCount + 1 : filterCount - 1)
            setDates(newDates)
          }}
          activeOpacity={0.6}
          style={[styles.box, {
            padding: 4,
            justifyContent: 'space-between',
            alignItems: 'center'
          }, value.selected && styles.boxActive]}>
          <Text style={[styles.extrabold, value.selected && styles.textActive]}>{value.label}</Text>
        </TouchableOpacity>
      ))}
      </View>
      <View style={{ height: 28 }} />
      <Button
        label={`Terapkan filter (${filterCount})`}
        onPress={() => {
          onApply(dates, filterCount > 0)
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
  bold: {
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
    color: Colors.textColorSecondary,
    includeFontPadding: false,
  },
  extrabold: {
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
    color: Colors.textColorSecondary,
    includeFontPadding: false,
  },
  box: {
    borderRadius: 12,
    borderColor: Colors.textColorSecondary,
    borderWidth: 1,
    backgroundColor: Colors.secondary,
    padding: 14,
    marginBottom: 16,
    flexGrow: 1,
  },
  boxActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryShadow,
  },
  textActive: {
    color: Colors.primary,
  }
});

export default CategoriesFilterModal;