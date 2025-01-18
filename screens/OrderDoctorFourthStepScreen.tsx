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
import { Rating } from '@kolking/react-native-rating';

interface DoctorData {
  profile: any,
  name: string,
  category: string,
  startPrice: number,
  rating: number,
  experience: number,
  favorite: boolean,
}

const doctors: DoctorData[] = [
  {
    profile: require('../assets/img/placeholder_doctor.png'),
    name: 'Dr. Sumanto',
    category: 'Dokter Umum',
    startPrice: 300_000,
    rating: 4.8,
    experience: 28,
    favorite: true,
  },
  {
    profile: require('../assets/img/placeholder_doctor.png'),
    name: 'Dr. Abdul',
    category: 'Dokter Umum',
    startPrice: 300_000,
    rating: 4.4,
    experience: 8,
    favorite: true,
  },
]

function OrderDoctorFourthStepScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const [selected, setSelected] = useState<DoctorData>(doctors[0]);
  const numFormat = Intl.NumberFormat('id-ID', {
    currency: 'IND',
  })
  
  return (
    <View style={styles.screenContainer}>
      <StepsHeaderBar
        label='Pemesanan Dokter'
        message='Langkah keempat: Pilih dokter nya'
        step={4}
        maxSteps={7}/>
      <View style={{ height: 12, opacity: 0 }} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.contentContainer}>
        <View>
          <View style={{ height: 20, opacity: 0 }} />
          <FlatList
            scrollEnabled={false}
            data={doctors}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => setSelected(item)}
                activeOpacity={0.6}
                style={[styles.card, item === selected && styles.cardSelected]}>
                <View style={styles.profileContainer}>
                  <Image source={item.profile} style={styles.profile} />
                </View>
                <View style={{ justifyContent: 'space-between' }}>
                  <Text style={styles.boldText}>{item.name}</Text>
                  <Text style={styles.regularText}>{item.category}</Text>
                  <View style={{ height: 6 }} />
                  <Text style={styles.regularText}>Rp {numFormat.format(item.startPrice)}</Text>
                </View>
                <View style={{ justifyContent: 'space-between', flex: 1, alignItems: 'flex-end' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Rating rating={1} maxRating={1} variant='stars' size={16} />
                    <View style={{ width: 10 }}/>
                    <Text style={styles.mediumText}>{item.rating}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={require('../assets/img/ic_experience_black.png')}
                      style={{
                        width: 22,
                        height: 22,
                      }}/>
                    <View style={{ width: 6 }}/>
                    <Text style={styles.mediumText}>{item.experience} Tahun</Text>
                  </View>
                  <View style={{ height: 4 }} />
                  <View style={{
                    width: 32,
                    height: 32,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}>
                    <Image
                      source={require('../assets/img/ic_favorite_filled.png')}
                      style={{
                        width: 24,
                        height: 24,
                      }} />
                  </View>
                </View>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={{ width: '100%', height: 1, backgroundColor: Colors.textColorSecondary }} />}
            ListHeaderComponent={() => <View style={{ width: '100%', height: 1, backgroundColor: Colors.textColorSecondary }} />}
            ListFooterComponent={() => <View style={{ width: '100%', height: 1, backgroundColor: Colors.textColorSecondary }} />}/>
          <View style={{ height: 20 }} />
        </View>
      </ScrollView>
      <Button
        label='Lanjut'
        onPress={() => navigation.navigate('OrderDoctorFifthStep' as never)}
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
  card: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: Colors.secondary,
    flexDirection: 'row',
  },
  cardSelected: {
    backgroundColor: Colors.primaryShadow,
  },
  profileContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: 14,
  },
  profile: {
    width: 90,
    height: 90,
  },
  boldText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
    color: Colors.textColor,
    includeFontPadding: false,
  },
  regularText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    color: Colors.textColor,
    includeFontPadding: false,
  },
  mediumText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    color: Colors.textColor,
    includeFontPadding: false,
  },
});

export default OrderDoctorFourthStepScreen;