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
  notificationEnabled?: boolean,
  rootStyle?: StyleProp<ViewStyle>,
  containerStyle?: StyleProp<ViewStyle>,
  labelStyle?: StyleProp<TextStyle>,
  onPress?: () => void,
}

function StackHeaderBar({ label, notificationEnabled, rootStyle, containerStyle, labelStyle, onPress }: Props): React.JSX.Element {
  const navigation = useNavigation();

  return (
    <View style={[styles.root, rootStyle]}>
      <View style={[styles.container, containerStyle]}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={
            onPress ? onPress :
            () => navigation.canGoBack() && navigation.goBack()
          }>
          <Image source={require('../assets/img/ic_back_arrow.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      </View>
      { notificationEnabled &&
      <View style={styles.notification}>
        <Image source={require('../assets/img/ic_notification.png')} />
      </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
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
  },
  notification: {
    alignSelf: 'center',
    padding: 10,
    borderRadius: '100%',
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
  },
});

export default StackHeaderBar;