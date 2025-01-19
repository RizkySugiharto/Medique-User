import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  useWindowDimensions,
} from 'react-native';
import Colors  from '../styles/colors';
import { Rating } from '@kolking/react-native-rating';
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import { ShadowedView, shadowStyle } from 'react-native-fast-shadow';

interface Props {
  data: {
    profile: any,
    name: string,
    category: string,
    favorite: boolean,
    rating: number,
    experience: number,
  }
}

function DoctorCard({ data }: Props): React.JSX.Element {
  const window = useWindowDimensions()
  const navigation = useNavigation();
  const profileSize = ( ( window.width - 24 * 2) - 16 ) / 2
  const [favorite, setFavorite] = useState(data.favorite);
  const [favoriteVerify, setFavoriteVerify] = useState(false);
  const handleFavorite = () => {
    if (data.favorite) {
      setFavoriteVerify(true)
    } else {
      toggleFavorite()
    }
  }
  const toggleFavorite = () => {
    data.favorite = !data.favorite
    setFavorite(data.favorite)
  }

  return (
    <>
    <View>
      <Modal
        animationIn='shake'
        animationOut='slideOutDown'
        useNativeDriver={true}
        useNativeDriverForBackdrop={true}
        isVisible={favoriteVerify}>
        <ShadowedView
          style={shadowStyle({
            opacity: 1,
            offset: [0, 4],
            radius: 20,
            color: 'rgba(0, 0, 0, 0.25)',
          })}>
          <View style={{
            borderColor: Colors.textColorSecondary,
            borderWidth: 1,
            borderRadius: 14,
            backgroundColor: Colors.secondary,
          }}>
            <Text style={{
              fontFamily: 'Manrope-SemiBold',
              fontSize: 18,
              textAlign: 'center',
              color: 'rgb(0, 0, 0)',
              paddingVertical: 16,
              paddingHorizontal: 20
            }}>kamu yakin hapus {data.name} dari favorit?</Text>
            <TouchableOpacity
              onPress={() => {
                toggleFavorite()
                setFavoriteVerify(false)
              }}
              style={{
                borderColor: Colors.primaryShadow,
                borderTopWidth: 1,
                borderBottomWidth: 1,
                paddingVertical: 12,
              }}
              activeOpacity={0.6}>
              <Text style={{
                fontFamily: 'Manrope-SemiBold',
                fontSize: 18,
                textAlign: 'center',
                color: 'rgb(255, 0, 0)',
              }}>Ya, hapus</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setFavoriteVerify(false)}
              activeOpacity={0.6}
              style={{ paddingVertical: 12 }}>
              <Text style={{
                fontFamily: 'Manrope-Regular',
                fontSize: 18,
                textAlign: 'center',
                color: Colors.primary,
              }}>Tidak</Text>
            </TouchableOpacity>
          </View>
        </ShadowedView>
      </Modal>
    </View>
    <TouchableOpacity
      onPress={() => navigation.navigate('DoctorDetails' as never)}
      activeOpacity={0.8}
      style={{ width: profileSize }}>
      <TouchableOpacity
        onPress={handleFavorite}
        activeOpacity={(0.75)}
        style={styles.favorite}>
        <Image
          source={
            favorite ?
            require('../assets/img/ic_favorite_filled.png')
            :
            require('../assets/img/ic_favorite_outline.png')
          }
          style={{
            width: 28,
            height: 28,
          }}/>
      </TouchableOpacity>
      <Image source={data.profile} style={[styles.profile, { width: profileSize, height: profileSize }]} />
      <View style={{ height: 12 }} />
      <Text style={styles.name}>{data.name}</Text>
      <View style={{ height: 6 }} />
      <Text style={styles.category}>{data.category}</Text>
      <View style={{ height: 12 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Rating
            variant='stars'
            disabled={true}
            rating={1}
            maxRating={1}
            size={12} />
          <View style={{ width: 4 }} />
          <Text style={styles.info}>{data.rating}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../assets/img/ic_experience.png')} style={styles.profile} />
          <View style={{ width: 4 }} />
          <Text style={[styles.info, { color: Colors.textColorSecondary }]}>{data.experience} Tahun</Text>
        </View>
      </View>
    </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  favorite: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderRadius: '100%',
  },
  profile: {
    borderRadius: 15,
  },
  name: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: Colors.textColor,
  },
  category: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: Colors.textColorSecondary,
  },
  info: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    color: Colors.textColor,
  }
});

export default DoctorCard;