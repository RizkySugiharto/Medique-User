import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  InteractionManager,
  useWindowDimensions
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import Colors  from '../styles/colors';
import Button from '../components/Button';

type Option = 'sms' | 'email';

function ForgotPasswordVerifyScreen(): React.JSX.Element {
  const CELL_COUNT = 4;
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const [timer, setTimer] = useState(60);
  const route: RouteProp<{ params: {
    type: Option,
    sender: string,
    senderHidden: string,
  } }, 'params'> = useRoute()
  const [code, setCode] = useState('');
  const codeRef = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value: code, setValue: setCode })
  const cellSize = (width - 20 * 2) * 0.215

  return (
    <View style={styles.screenContainer}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={styles.regularText}>Code has been send to {route.params.senderHidden}</Text>
        <View style={{height: 30}} />
        <CodeField
          ref={codeRef}
          {...props}
          cellCount={CELL_COUNT}
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <View
              key={index}
              onLayout={getCellOnLayoutHandler(index)}
              style={[styles.cellInput, { width: cellSize, height: cellSize }, isFocused && styles.cellInputOnFocus]}>
              <Text
                style={styles.cellText}>
                {isFocused ? <Cursor/> : symbol}
              </Text>
            </View>
          )}/>
        <View style={{height: 32}} />
        <Text style={styles.regularText}>Resend code in <Text style={{color: Colors.primary}}>{timer}s</Text></Text>
      </View>
      <View style={{ flexBasis: 70, justifyContent: 'flex-end' }}>
        <Button label='Verify' onPress={() => navigation.navigate('CreateNewPassword' as never)} />
      </View>
      <View style={{height: 24}} />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.secondary,
  },
  regularText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: Colors.textColor,
    textAlign: 'center',
  },
  cellInput: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.textColorSecondary,
  },
  cellInputOnFocus: {
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryShadow,
  },
  cellText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Manrope-Bold',
    fontSize: 34,
    paddingBottom: 4,
  },
});

export default ForgotPasswordVerifyScreen;