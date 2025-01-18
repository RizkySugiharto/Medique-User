import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors  from '../styles/colors';
import StepsHeaderBar from '../components/StepsHeaderBar';
import LabeledInput from '../components/LabeledInput';
import Button from '../components/Button';
import { SimpleGrid } from 'react-native-super-grid';
import CategoryCard from '../components/CategoryCard';
import SessionStorage from 'react-native-session-storage';

function OrderDoctorSecondStepScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const categories = SessionStorage.getItem('@categories')
  const [selected, setSelected] = useState(0);
  const [prompt, setPrompt] = useState('');
  
  return (
    <View style={styles.screenContainer}>
      <StepsHeaderBar
        label='Pemesanan Dokter'
        message='Langkah kedua: pilih kategori dokter'
        step={2}
        maxSteps={7}/>
      <View style={{ height: 12, opacity: 0 }} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.contentContainer}>
        <View style={{ paddingHorizontal: 24 }}>
          <View style={{ height: 20, opacity: 0 }} />
          <Text style={styles.mediumText}>Pilih kategori dokter yang <Text style={styles.bold}>sesuai</Text> dengan <Text style={styles.bold}>gejala yang Anda alami.</Text></Text>
          <View style={{ height: 20 }} />
          <Text style={styles.mediumText}>Jika bingung, tanyakan kepada <Text style={styles.bold}>AI</Text> untuk rekomendasi.</Text>
          <View style={{ height: 10 }} />
          <LabeledInput
            value={prompt}
            setValue={setPrompt}
            placeholder='ketik pesan...'
            inputStyle={styles.inputText}
            renderRight={() => (
              <TouchableOpacity
                style={styles.send}
                activeOpacity={0.8}>
                <Image source={require('../assets/img/ic_send.png')} style={styles.sendIcon} />
              </TouchableOpacity>
            )}
            />
          <View style={{ height: 28 }} />
          <Text style={styles.mediumText}>Untuk penyakit kamu, saya saran kan kamu untuk milih <Text style={styles.bold}>dokter spesialis anak</Text></Text>
          <View style={{ height: 26 }} />
        </View>
        <View style={{ width: '100%', height: 3, backgroundColor: Colors.primaryShadow }} />
        <View style={{ paddingHorizontal: 24 }}>
          <View style={{ height: 22 }} />
          <Text style={styles.mediumText}>Atau pilih kategori dokter di bawah ini</Text>
          <View style={{ height: 18 }} />
          <SimpleGrid
            listKey='categories'
            data={categories}
            additionalRowStyle={styles.rowCategories}
            renderItem={({ index, item }) => (
              <CategoryCard
                icon={item.icon}
                name={item.name}
                selected={selected === index}
                onPress={() => setSelected(index)} />
            )}
            />
            <View style={{ height: 100 }} />
        </View>
      </ScrollView>
      <Button
        label='Lanjut'
        onPress={() => navigation.navigate('OrderDoctorThirdStep' as never)}
        buttonStyle={{
          position: 'absolute',
          bottom: 30,
          left: 24,
          right: 24,
        }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: Colors.secondary,
  },
  inputText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    includeFontPadding: false,
    paddingRight: 20,
  },
  send: {
    borderRadius: 5,
    backgroundColor: Colors.primary,
    paddingHorizontal: 5,
    paddingVertical: 6,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  sendIcon: {
    width: 30,
    height: 30,
  },
  mediumText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    includeFontPadding: false,
  },
  bold: {
    fontFamily: 'Manrope-Bold',
  },
  rowCategories: {
    justifyContent: 'space-between',
    paddingLeft: 0,
    paddingBottom: 18,
  }
});

export default OrderDoctorSecondStepScreen;