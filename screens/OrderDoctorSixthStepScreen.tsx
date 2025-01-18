import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors  from '../styles/colors';
import StepsHeaderBar from '../components/StepsHeaderBar';
import Button from '../components/Button';
import SessionStorage from 'react-native-session-storage';
import LabeledInput from '../components/LabeledInput';
import utils from '../utils';

interface PriceData {
  name: string,
  price: number,
}

interface DoctorData {
  profile: any,
  name: string,
  category: string,
}

interface UserData {
  name: string,
  gender: 'Laki-Laki' | 'Perempuan',
  birthDate: Date,
}

interface DetailBox {
  label: string,
  renderTop: () => React.ReactNode,
  renderBottom: () => React.ReactNode,
  onRefresh: () => void
}

function getUserData(): UserData {
  const data = SessionStorage.getItem('@user_data')
  return {
    name: data.name,
    gender: data.gender,
    birthDate: data.birthDate
  }
}

function getDoctorData(): DoctorData {
  const data = SessionStorage.getItem('@selected_doctor')
  return {
    profile: data.profile,
    name: data.name,
    category: data.category,
  }
}

function DetailBox({ label, renderTop, renderBottom, onRefresh }: DetailBox): React.ReactNode | React.ReactElement {
  return (
    <View>
      <Text style={styles.semiboldText}>{label}</Text>
      <View style={{ height: 12 }} />
      <View style={styles.detailBox}>
        <TouchableOpacity
          onPress={onRefresh}
          activeOpacity={0.5}
          style={{ alignSelf: 'flex-end', paddingTop: 14, paddingRight: 14 }}>
          <Image
            source={require('../assets/img/ic_refresh.png')}
            style={{ width: 16, height: 16 }} />
        </TouchableOpacity>
        <View>{ renderTop() }</View>
        <View style={{ flex: 1, height: 1, backgroundColor: Colors.primary }} />
        <View>{ renderBottom() }</View>
      </View>
    </View>
  )
}

function OrderDoctorSixthStepScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const userData = getUserData()
  const doctorData = getDoctorData()
  const [diseases, setDiseases] = useState<string[]>(SessionStorage.getItem('@payment_diseases') || []);
  const [actions, setActions] = useState<string[]>(SessionStorage.getItem('@payment_actions') || []);
  const [prices, setPrices] = useState<PriceData[]>(SessionStorage.getItem('@payment_prices') || []);
  const [totalPrice, setTotalPrice] = useState<number>(
    prices.reduce(
      (pre, value) => ({ name: '', price: pre.price + value.price }),
      { name: '', price: 0 }
    ).price
  );
  const numFormat = Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  })
  
  return (
    <View style={styles.screenContainer}>
      <StepsHeaderBar
        label='Pemesanan Dokter'
        message='Langkah keenam: Rincian biaya'
        step={6}
        maxSteps={7}/>
      <View style={{ height: 12, opacity: 0 }} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.contentContainer}>
        <View style={{ height: 20, opacity: 0 }} />
        <DetailBox
          label='Penyakit & Tindakan Dokter'
          onRefresh={() => {}}
          renderTop={() => (
            <View style={{ paddingHorizontal: 20, paddingBottom: 16 }}>
              <Text style={styles.semiboldText}>Penyakit</Text>
              <View style={{ height: 8 }} />
              <FlatList
                data={diseases}
                scrollEnabled={false}
                renderItem={({ item, index }) => <Text key={index} style={styles.regularText}>{item}</Text>}
                ItemSeparatorComponent={() => <View style={{ height: 2 }} />} />
            </View>
          )}
          renderBottom={() => (
            <View style={{ paddingHorizontal: 20, paddingBottom: 16, paddingTop: 20 }}>
              <Text style={styles.semiboldText}>Tindakan Dokter</Text>
              <View style={{ height: 8 }} />
              <FlatList
                data={actions}
                scrollEnabled={false}
                renderItem={({ item, index }) => <Text key={index} style={styles.regularText}>{item}</Text>}
                ItemSeparatorComponent={() => <View style={{ height: 2 }} />} />
            </View>
          )}
          />
        <View style={{ height: 20 }} />
        <DetailBox
          label='Detail Pembayaran'
          onRefresh={() => {}}
          renderTop={() => (
            <View style={{ paddingLeft: 20, paddingRight: 14, paddingBottom: 20, paddingTop: 12 }}>
              <View style={{ height: 4 }} />
              <FlatList
                data={prices}
                scrollEnabled={false}
                renderItem={({ item, index }) => (
                  <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <Text style={styles.regularText}>{item.name}</Text>
                    <Text style={styles.regularText}>{numFormat.format(item.price)}</Text>
                  </View>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
                contentContainerStyle={{ paddingBottom: 2 }} />
            </View>
          )}
          renderBottom={() => (
            <View style={{
              paddingLeft: 20,
              paddingRight: 14,
              paddingVertical: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline'
            }}>
              <Text style={styles.semiboldText}>Total:</Text>
              <Text style={styles.semiboldText}>{numFormat.format(totalPrice)}</Text>
            </View>
          )}
          />
          <View style={{ height: 20 }} />
          <LabeledInput
            readOnly={true}
            name='Informasi pasien'
            value={`${userData.name}, ${userData.gender}, ${utils.calculateAge(userData.birthDate)} tahun`}
            labelStyle={styles.regularText}
            />
          <View style={{ height: 20 }} />
          <Text style={styles.semiboldText}>Dokter yang dipilih</Text>
          <View style={{ height: 12 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={styles.boldText}>{doctorData.name}</Text>
              <View style={{ height: 4 }} />
              <Text style={styles.regularText}>{doctorData.category}</Text>
            </View>
            <View style={{ width: 10 }} />
            <View style={{ borderRadius: '100%', width: 84, height: 84, overflow: 'hidden' }}>
              <Image source={doctorData.profile} style={{ width: 84, height: 84 }} />
            </View>
          </View>
          <View style={{ height: 135 }} />
      </ScrollView>
      <Button
        label='Bayar :'
        labelRight={numFormat.format(totalPrice)}
        onPress={() => navigation.navigate('OrderDoctorFinished' as never)}
        buttonStyle={{
          position: 'absolute',
          bottom: 30,
          left: 24,
          right: 24,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 24,
          paddingVertical: 20,
          borderRadius: 42,
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
    paddingHorizontal: 24,
    backgroundColor: Colors.secondary,
  },
  boldText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: Colors.textColor,
    includeFontPadding: false,
  },
  regularText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: Colors.textColor,
    includeFontPadding: false,
  },
  semiboldText: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 16,
    color: Colors.textColor,
    includeFontPadding: false,
  },
  detailBox: {
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.secondary,
  },
});

export default OrderDoctorSixthStepScreen;