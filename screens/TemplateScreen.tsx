import React from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors  from '../styles/colors';

function TemplateScreen(): React.JSX.Element {
  const navigation = useNavigation();

  return (
    <View style={styles.screenContainer}>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.secondary,
  },
});

export default TemplateScreen;