import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors  from '../styles/colors';
import StepsHeaderBar from '../components/StepsHeaderBar';
import Button from '../components/Button';
import LabeledInput from '../components/LabeledInput';
import { Rating } from '@kolking/react-native-rating';
import SessionStorage from 'react-native-session-storage';

interface DoctorData {
  name: string,
  favorite: boolean
}

function getDoctorData(): DoctorData {
  const data = SessionStorage.getItem('@selected_doctor')
  return {
    name: data.name,
    favorite: data.favorite,
  }
}

function OrderDoctorSeventhStepScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const doctorData = getDoctorData()
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [favorite, setFavorite] = useState(doctorData.favorite);
  const handleFavorite = () => {
    doctorData.favorite = !doctorData.favorite
    SessionStorage.setItem('@selected_doctor',
      {
        ...SessionStorage.getItem('@selected_doctor'),
        ...doctorData
      }
    )
    setFavorite(doctorData.favorite)
  }
  const handleSendReview = () => {
    navigation.navigate(...['Root', { screen: 'Home' }] as never)
  }
  
  return (
    <View style={styles.screenContainer}>
      <StepsHeaderBar
        label='Pemesanan Dokter'
        message='Langkah ketujuh: Rating dokter'
        step={7}
        maxSteps={7}/>
      <View style={{ height: 12, opacity: 0 }} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.contentContainer}>
        <View style={{ height: 20, opacity: 0 }} />
        <Text style={styles.semiboldText}>Tambahkan rating kamu</Text>
        <View style={{ height: 18, opacity: 0 }} />
        <View>
          <Rating
            rating={rating}
            onChange={setRating}
            baseColor={Colors.tertiary}
            fillColor={Colors.tertiary}
            touchColor={Colors.tertiary}
            size={36}
            variant='stars-outline' />
        </View>
        <View style={{ height: 18, opacity: 0 }} />
        <LabeledInput 
          name='Tambahkan ulasan juga :'
          value={review}
          setValue={setReview}
          multiline={true}
          numberOfLines={10}
          labelStyle={[styles.semiboldText, { marginBottom: 10 }]}
          inputStyle={[styles.regularText, { height: 250, textAlignVertical: 'top' }]}
          placeholder='Ketik ulasanmu di sini...' />
        <View style={{ height: 28 }} />
      </ScrollView>
      <View style={{ paddingHorizontal: 24, paddingBottom: 24 }}>
        { favorite ?
          <Button
            label='Tidak jadi tambah ke favorit'
            onPress={handleFavorite}
            labelStyle={styles.boldTextWhite}
            buttonStyle={{
              borderRadius: 42
            }} />
          :
          <Button
            label='Tambah ke favorit dokter'
            onPress={handleFavorite}
            labelStyle={styles.boldTextPrimary}
            buttonStyle={{
              backgroundColor: Colors.secondary,
              borderColor: Colors.primary,
              borderWidth: 2,
              borderRadius: 42,
            }} />
        }
        <View style={{ height: 16 }} />
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline' }}>
          <Button
            label='Lewati'
            onPress={() => navigation.navigate(...['Root', { screen: 'Home' }] as never)}
            labelStyle={styles.boldTextPrimary}
            buttonStyle={{
              backgroundColor: Colors.secondary,
              borderColor: Colors.primary,
              borderWidth: 2,
              borderRadius: 42,
              flex: 1
            }} />
          <View style={{ width: 16 }} />
          <Button
            label='Kirim'
            onPress={handleSendReview}
            labelStyle={styles.boldTextWhite}
            buttonStyle={{
              borderRadius: 42,
              flex: 1
            }} />
        </View>
      </View>
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
  boldTextWhite: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    color: Colors.secondary,
    includeFontPadding: false,
  },
  boldTextPrimary: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    color: Colors.primary,
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
});

export default OrderDoctorSeventhStepScreen;