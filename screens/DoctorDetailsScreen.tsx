// import React from 'react';
// import {
//   StyleSheet,
//   View,
//   Image,
//   ScrollView,
//   Text,
//   FlatList
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Colors  from '../styles/colors';
// import StackHeaderBar from '../components/StackHeaderBar';
// import { Rating } from '@kolking/react-native-rating';
// import Button from '../components/Button';

// const doctorData = {
//   profile: require('../assets/img/placeholder_doctor.png'),
//   name: 'Dr. Abdul',
//   category: 'Dokter Umum',
//   favorite: false,
//   rating: 4.8,
//   experience: 8,
//   details: {
//     patients: 105,
//     address: 'Rumah sakit asri asih ciputat',
//     description: "Halo, saya Dr. Abdul, dokter umum di Rumah Sakit Sarih Asih. Saya berkomitmen memberikan perawatan terbaik dengan pendekatan empatik dan ramah. Selain berpraktek, saya aktif dalam edukasi kesehatan dan terus memperbarui pengetahuan medis untuk membantu pasien memahami dan menjaga kesehatan mereka dengan lebih baik.",
//     workingTime: 'Senin - Minggu : 09:00 AM - 08:00 PM',
//     price: {
//       from: 100_000,
//       to: 500_000,
//     },
//     reviewCount: 1013,
//   },
// }

// const reviewsData = [
//   {
//     userProfile: require('../assets/img/placeholder_user.png'),
//     userName: 'Bang Jhon',
//     rating: 4,
//     message: "Dr. Abdul adalah dokter luar biasa! Beliau tidak hanya mengobati, tetapi juga memahami kondisi anak saya dengan penuh kasih. Penjelasannya selalu jelas dan membuat kami merasa tenang. Sangat direkomendasikan untuk keluarga mana pun!"
//   },
//   {
//     userProfile: require('../assets/img/placeholder_user.png'),
//     userName: 'Bang Jhon',
//     rating: 4,
//     message: "Dr. Abdul adalah dokter luar biasa! Beliau tidak hanya mengobati, tetapi juga memahami kondisi anak saya dengan penuh kasih. Penjelasannya selalu jelas dan membuat kami merasa tenang. Sangat direkomendasikan untuk keluarga mana pun!"
//   },
// ]

// function DoctorDetailsScreen(): React.JSX.Element {
//   const navigation = useNavigation();

//   return (
//     <ScrollView
//     style={styles.screenContainer}>
//       <StackHeaderBar
//         label='Kembali'
//         containerStyle={{ paddingTop: 24 }}
//         labelStyle={{ marginLeft: 8, fontFamily: 'Manrope-Bold' }} />
//       <View style={{ height: 30 }} />
//       <View style={{ flexDirection: 'row' }}>
//         <Image source={require('../assets/img/placeholder_doctor.png')} style={styles.profile} />
//         <View style={{ justifyContent: 'space-between' }}>
//           <Text style={styles.doctorName}>{doctorData.name}</Text>
//           <Text style={styles.doctorDetail}>{doctorData.details.address} ({doctorData.category})</Text>
//         </View>
//       </View>
//       <View style={{ height: 20 }} />
//       <View style={{ flexDirection: 'row' }}>
//         <View style={[styles.awardCard, { backgroundColor: 'rgb(216, 250, 217)' }]}>
//           <View style={[styles.awardIconContainer, { backgroundColor: 'rgb(73, 172, 79)' }]}>
//             <Image source={require('../assets/img/ic_awards.png')} style={styles.awardIcon} />
//           </View>
//           <View style={{ justifyContent: 'space-between' }}>
//             <Text style={styles.awardValue}>{doctorData.experience} Tahun</Text>
//             <Text style={styles.awardName}>Pengalaman</Text>
//           </View>
//         </View>
//         <View style={[styles.awardCard, { backgroundColor: 'rgb(216, 250, 217)' }]}>
//           <View style={[styles.awardIconContainer, { backgroundColor: 'rgb(73, 172, 79)' }]}>
//             <Image source={require('../assets/img/ic_awards.png')} style={styles.awardIcon} />
//           </View>
//           <View style={{ justifyContent: 'space-between' }}>
//             <Text style={styles.awardValue}>{doctorData.details.patients}</Text>
//             <Text style={styles.awardName}>Pasien</Text>
//           </View>
//         </View>
//       </View>
//       <View style={{ height: 30 }} />
//       <Text style={styles.infoTitle}>Profile Dokter</Text>
//       <View style={{ height: 16 }} />
//       <Text style={styles.info}>{doctorData.details.description}</Text>
//       <View style={{ height: 35 }} />
//       <Text style={styles.infoTitle}>Jam Praktik</Text>
//       <View style={{ height: 16 }} />
//       <Text style={styles.info}>{doctorData.details.workingTime}</Text>
//       <View style={{ height: 16 }} />
//       <Text style={styles.infoTitle}>Harga Konsultasi</Text>
//       <View style={{ height: 16 }} />
//       <Text style={styles.info}>Pp. {doctorData.details.price.from} - Rp. {doctorData.details.price.to}</Text>
//       <View style={{ height: 16 }} />
//       <Text style={styles.infoTitle}>Review {doctorData.rating} ({doctorData.details.reviewCount})</Text>
//       <View style={{ height: 16 }} />
//       <View>
//         <FlatList
//           data={reviewsData}
//           renderItem={({ index, item }) => (
//             <View style={styles.reviewCard}>
//               <Rating
//                 variant='stars-outline'
//                 fillColor='rgb(253, 210, 100)'
//                 baseColor='rgb(253, 210, 100)'
//                 rating={item.rating}
//                 maxRating={5}
//                 disabled={true}/>
//               <View style={{ width: 14 }} />
//               <Text style={styles.reviewMessage}>{item.message}</Text>
//               <View style={{ width: 14 }} />
//               <View>
//                 <Image source={item.userProfile} style={styles.reviewUserProfile} />
//                 <Text style={styles.reviewUserName}>{item.userName}</Text>
//               </View>
//             </View>
//           )}
//           />
//       </View>
//       <View style={{ height: 32 }} />
//       <View style={{ flexDirection: 'row' }}>
//         <View style={{ padding: 22 }}>
//           <Image source={doctorData.favorite ?
//             require('../assets/img/ic_favorite_filled.png') :
//             require('../assets/img/ic_favorite_outline.png')
//           } />
//         </View>
//         <Button label='Pesan Sekarang' />
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   screenContainer: {
//     flexGrow: 1,
//     padding: 24,
//     backgroundColor: Colors.secondary,
//   },
// });

// export default DoctorDetailsScreen;