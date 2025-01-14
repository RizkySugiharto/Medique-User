import React from 'react';
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
  const profileSize = ( ( window.width - 24 * 2) - 11 ) / 2

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{ width: profileSize }}>
      <View style={styles.favorite}>
        <Image
          source={
            data.favorite ?
            require('../assets/img/ic_favorite_outline.png')
            :
            require('../assets/img/ic_favorite_outline.png')
          } />
      </View>
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