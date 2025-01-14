import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPasswordSelectScreen from '../ForgotPasswordSelectScreen';
import StackHeaderBar from '../../components/StackHeaderBar';
import ForgotPasswordVerifyScreen from '../ForgotPasswordVerifyScreen';

export default (): React.JSX.Element => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName='Select'
      screenOptions={{
        header: () => <StackHeaderBar label='Forgot password' />,
        headerShown: true
      }}>
      <Stack.Screen name='Select' component={ForgotPasswordSelectScreen} />
      <Stack.Screen name='Verify' component={ForgotPasswordVerifyScreen} />
    </Stack.Navigator>
  );
}