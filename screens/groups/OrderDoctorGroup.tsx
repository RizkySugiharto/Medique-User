import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StackHeaderBar from '../../components/StackHeaderBar';
import OrderDoctorFirstStepScreen from '../OrderDoctorFirstStepScreen';
import OrderDoctorSecondStepScreen from '../OrderDoctorSecondStepScreen';
import OrderDoctorThirdStepScreen from '../OrderDoctorThirdStepScreen';
import OrderDoctorThirdStepByMapScreen from '../OrderDoctorThirdStepByMapScreen';
import { useNavigation } from '@react-navigation/native';
import OrderDoctorFourthStepScreen from '../OrderDoctorFourthStepScreen';
import OrderDoctorFifthStepScreen from '../OrderDoctorFifthStepScreen';
import OrderDoctorSixthStepScreen from '../OrderDoctorSixthStepScreen';
import OrderDoctorSeventhStepScreen from '../OrderDoctorSeventhStepScreen';
import OrderDoctorFinishedScreen from '../OrderDoctorFinishedScreen';

export default (): React.JSX.Element => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName='OrderDoctorFirstStep'
      screenOptions={{
        header: () => (
        <StackHeaderBar
          label='Pemesanan Dokter'
          containerStyle={{ padding: 24 }}
          labelStyle={{ marginLeft: 8, fontFamily: 'Manrope-Bold' }} />
        ),
        headerShown: true,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name='OrderDoctorFirstStep'
        component={OrderDoctorFirstStepScreen} />
      <Stack.Screen
        name='OrderDoctorSecondStep'
        component={OrderDoctorSecondStepScreen} />
      <Stack.Screen
        name='OrderDoctorThirdStep'
        component={OrderDoctorThirdStepScreen} />
      <Stack.Screen
        name='OrderDoctorThirdStepByMap'
        component={OrderDoctorThirdStepByMapScreen}/>
      <Stack.Screen
        name='OrderDoctorFourthStep'
        component={OrderDoctorFourthStepScreen}/>
      <Stack.Screen
        name='OrderDoctorFifthStep'
        component={OrderDoctorFifthStepScreen}/>
      <Stack.Screen
        name='OrderDoctorSixthStep'
        component={OrderDoctorSixthStepScreen}/>
      <Stack.Screen
        name='OrderDoctorFinished'
        component={OrderDoctorFinishedScreen}
        options={{ headerShown: false, animation: 'fade_from_bottom' }}/>
      <Stack.Screen
        name='OrderDoctorSeventhStep'
        component={OrderDoctorSeventhStepScreen}/>
    </Stack.Navigator>
  );
}