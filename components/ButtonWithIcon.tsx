import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  Image,
  ImageStyle,
} from 'react-native';
import Colors  from '../styles/colors';

interface Props {
  icon: any,
  label: string,
  iconPosition?: 'left' | 'right',
  activeOpacity?: number,
  onPress?: () => void,
  buttonStyle?: StyleProp<ViewStyle>,
  iconStyle?: StyleProp<ImageStyle>,
  labelStyle?: StyleProp<TextStyle>
}

function ButtonWithIcon({ icon, label, iconPosition, activeOpacity, onPress, buttonStyle, iconStyle, labelStyle }: Props): React.JSX.Element {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={activeOpacity ? activeOpacity : 0.8}
      style={[styles.button, buttonStyle]}>
      { !iconPosition &&
        <>
        <Image source={icon} style={[styles.icon, iconStyle]}/>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        </>
      }
      { iconPosition === 'left' &&
        <>
        <Image source={icon} style={[styles.icon, iconStyle]}/>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        </>
      }
      { iconPosition === 'right' &&
        <>
        <Image source={icon} style={[styles.icon, iconStyle]}/>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        </>
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    button: {
      borderRadius: 32,
      borderColor: 'rgba(0, 0, 0, 0.2)',
      borderWidth: 1,
      backgroundColor: Colors.secondary,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      paddingVertical: 16,
    },
    icon: {
      width: 24,
      height: 24,
    },
    label: {
      fontSize: 20,
      fontFamily: 'Manrope-SemiBold',
      color: Colors.textColor,
      marginLeft: 6,
    }
});

export default ButtonWithIcon;