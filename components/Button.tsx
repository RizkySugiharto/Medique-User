import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Colors  from '../styles/colors';

interface Props {
  label: string,
  activeOpacity?: number,
  buttonStyle?: StyleProp<ViewStyle>,
  labelStyle?: StyleProp<TextStyle>,
  labelRight?: string,
  labelRightStyle?: StyleProp<TextStyle>,
  onPress?: () => void,
}

function Button({ label, activeOpacity, labelRight, buttonStyle, labelStyle, labelRightStyle, onPress }: Props): React.JSX.Element {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={activeOpacity ? activeOpacity : 0.8}
      style={[styles.button, buttonStyle]}>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        { labelRight && <Text style={[styles.label, labelRightStyle]}>{labelRight}</Text> }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    button: {
      borderRadius: 32,
      backgroundColor: Colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
    },
    label: {
      fontSize: 20,
      fontFamily: 'Manrope-SemiBold',
      color: Colors.textColorWhite,
    }
});

export default Button;