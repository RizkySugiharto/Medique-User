import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Colors  from '../styles/colors';
import { useNavigation } from '@react-navigation/native';

interface Props {
  label: string,
  containerStyle?: StyleProp<ViewStyle>,
  labelStyle?: StyleProp<TextStyle>,
}

function StackHeaderBar({ label, containerStyle, labelStyle }: Props): React.JSX.Element {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.canGoBack() && navigation.goBack()}>
        <Image source={require('../assets/img/ic_back_arrow.png')} style={styles.icon} />
      </TouchableOpacity>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.secondary,
  },
  icon: {
    width: 25,
    height: 25,
  },
  label: {
    marginLeft: 6,
    fontSize: 16,
    fontFamily: 'Manrope-Medium',
    color: Colors.textColor,
    includeFontPadding: false,
  }
});

export default StackHeaderBar;