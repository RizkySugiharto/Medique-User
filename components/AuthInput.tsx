import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors  from '../styles/colors';

interface Props {
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    name: string,
    placeholder: string,
    secureTextEntry?: boolean | false
}

function AuthInput({ value, setValue, name, placeholder, secureTextEntry }: Props): React.JSX.Element {
  return (
    <View style={styles.container}>
        <Text style={styles.label}>{name}</Text>
        <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            style={styles.input}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  label: {
    fontSize: 16,
    fontFamily: 'Manrope-Regular',
    color: Colors.textColor,
    marginBottom: 6,
  },
  input: {
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 14,
    fontFamily: 'Manrope-Regular',
  }
});

export default AuthInput;