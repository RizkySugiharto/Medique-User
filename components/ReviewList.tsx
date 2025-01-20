import React from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Image,
} from 'react-native';
import Colors  from '../styles/colors';
import { ShadowedView, shadowStyle } from 'react-native-fast-shadow';
import { Rating } from '@kolking/react-native-rating';

interface ReviewData {
  userProfile: any,
  userName: string,
  rating: number,
  message: string,
}

interface Props {
  data: ReviewData[],
  paddingHorizontal?: number,
  paddingVertical?: number,
  footerHeight?: number
}

function ReviewList({ data, paddingHorizontal, paddingVertical, footerHeight }: Props): React.JSX.Element {
  return (
    <FlatList
      data={data}
      scrollEnabled={false}
      renderItem={({ index, item }) => (
        <ShadowedView
          style={shadowStyle({
            opacity: 1,
            offset: [0, 3],
            color: 'rgba(0, 0, 0, 0.1)',
            radius: 8
          })}>
          <View style={styles.reviewCard}>
            <Rating
              variant='stars-outline'
              fillColor='rgb(253, 210, 100)'
              baseColor='rgb(253, 210, 100)'
              size={20}
              rating={item.rating}
              maxRating={5}
              disabled={true}/>
            <View style={{ height: 14 }} />
            <Text style={styles.reviewMessage}>{item.message}</Text>
            <View style={{ height: 14 }} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.reviewUserProfileContainer}>
                <Image source={item.userProfile} style={styles.reviewUserProfile} />
              </View>
              <View style={{ width: 14 }} />
              <Text style={styles.reviewUserName}>{item.userName}</Text>
            </View>
          </View>
        </ShadowedView>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 12 }}/>}
      ListFooterComponent={() => <View style={{ height: footerHeight || 120 }} />}
      contentContainerStyle={{
        paddingHorizontal: paddingHorizontal || 24,
        paddingVertical: paddingVertical || 16,
      }}
      />
  );
}

const styles = StyleSheet.create({
  reviewCard: {
    padding: 20,
    backgroundColor: Colors.secondary,
    borderRadius: 9,
  },
  reviewMessage: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: Colors.textColor,
    includeFontPadding: false,
  },
  reviewUserProfileContainer: {
    width: 50,
    height: 50,
    borderRadius: '100%',
    overflow: 'hidden',
  },
  reviewUserProfile: {
    width: 50,
    height: 50,
    marginRight: 14,
  },
  reviewUserName: {
    fontFamily: 'Manrope-Semibold',
    fontSize: 18,
    color: Colors.textColor,
    includeFontPadding: false,
  }
});

export default ReviewList;