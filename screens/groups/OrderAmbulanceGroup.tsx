import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StackHeaderBar from '../../components/StackHeaderBar';
import OrderAmbulanceSelectScreen from '../OrderAmbulanceSelectScreen';
import { ShadowedView, shadowStyle } from 'react-native-fast-shadow';
import OrderAmbulanceDetailScreen from '../OrderAmbulanceDetailScreen';
import TrackAmbulanceScreen from '../TrackAmbulanceScreen';
import OrderAmbulanceFinishedScreen from '../OrderAmbulanceFinishedScreen';

export default (): React.JSX.Element => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName='OrderAmbulanceSelect'
      screenOptions={{
        header: () => (
          <ShadowedView style={shadowStyle({
            color: 'rgba(0, 0, 0, 0.25)',
            radius: 10,
            opacity: 1,
            offset: [0, 2]
          })}>
            <StackHeaderBar
              label='Pemesanan Ambulans'
              containerStyle={{ padding: 24 }}
              labelStyle={{ marginLeft: 8, fontFamily: 'Manrope-Bold' }} />
          </ShadowedView>
        ),
        headerShown: true,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name='OrderAmbulanceSelect'
        component={OrderAmbulanceSelectScreen} />
      <Stack.Screen
        name='OrderAmbulanceDetail'
        component={OrderAmbulanceDetailScreen}
        options={{
          header: () => (
            <ShadowedView style={shadowStyle({
              color: 'rgba(0, 0, 0, 0.25)',
              radius: 10,
              opacity: 1,
              offset: [0, 2]
            })}>
              <StackHeaderBar
                label='Kembali'
                containerStyle={{ padding: 24 }}
                labelStyle={{ marginLeft: 8, fontFamily: 'Manrope-Bold' }} />
            </ShadowedView>
          ),
        }}/>
      <Stack.Screen
        name='TrackAmbulance'
        component={TrackAmbulanceScreen} />
      <Stack.Screen
        name='OrderAmbulanceFinished'
        component={OrderAmbulanceFinishedScreen}
        options={{ headerShown: false, animation: 'fade_from_bottom' }} />
    </Stack.Navigator>
  );
}