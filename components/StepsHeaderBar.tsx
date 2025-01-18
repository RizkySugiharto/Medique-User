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
  FlatList,
} from 'react-native';
import Colors  from '../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { ShadowedView, shadowStyle } from 'react-native-fast-shadow';

interface Props {
  label: string,
  message: string,
  step: number,
  maxSteps: number,
  containerStyle?: StyleProp<ViewStyle>,
}

function StepsHeaderBar({ message, step, maxSteps, containerStyle }: Props): React.JSX.Element {
  const steps: { active: boolean }[] = []

  for (let i = 0; i < maxSteps; i++) {
    steps.push({ active: i < step })
  }

  return (
    <ShadowedView style={shadowStyle({
      color: 'rgba(0, 0, 0, 0.25)',
      radius: 10,
      opacity: 1,
      offset: [0, 2]
    })}>
      <View style={[styles.container, containerStyle]}>
        <View style={{ paddingHorizontal: 8 }}>
          <Text style={styles.message}>{message}</Text>
          <View style={{ height: 14 }} />
          <Text style={styles.stepMessage}>{step} dari {maxSteps} {step >= maxSteps ? 'langkah selesai' : 'langkah lagi...'}</Text>
          <View style={{ height: 10 }} />
          <View>
            <View style={styles.stepsContainer}>
              {steps.map((value, index) => (
                <View key={index} style={[
                  styles.step,
                  index > 0 && styles.stepSpacing,
                  value.active && styles.stepActive
                ]}/>
              ))}
            </View>
          </View>
        </View>
      </View>
    </ShadowedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 26,
    backgroundColor: Colors.secondary,
  },
  message: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: Colors.textColor,
    includeFontPadding: false,
  },
  stepMessage: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.5)',
    includeFontPadding: false,
  },
  stepsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  step: {
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 6,
    flex: 1,
  },
  stepActive: {
    backgroundColor: Colors.primary,
  },
  stepSpacing: {
    marginLeft: 4,
  }
});

export default StepsHeaderBar;