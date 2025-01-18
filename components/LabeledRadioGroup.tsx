import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StyleProp,
  TextStyle,
} from 'react-native';
import Colors  from '../styles/colors';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';

interface RadioProps {
  label: string,
  value: string,
}

interface Props {
  radioProps: RadioProps[],
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  name: string,
  labelStyle?: StyleProp<TextStyle>,
}

function LabeledRadioGroup({ radioProps, value, setValue, name, labelStyle }: Props): React.JSX.Element {
  const radioButtons: RadioButtonProps[] = useMemo((): RadioButtonProps[] => radioProps.map((value, index) => ({
    id: index + '',
    label: value.label,
    value: value.value,
    containerStyle: styles.radioButtonContainer,
    labelStyle: [styles.radioLabel, labelStyle],
    color: Colors.primary,
  })), []);

  return (
    <View style={styles.container}>
        <Text style={styles.label}>{name}</Text>
        <RadioGroup 
          radioButtons={radioButtons} 
          onPress={setValue}
          selectedId={value}
          containerStyle={styles.radioGroupContainer}
        />
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
  radioGroupContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  radioLabel: {
    fontFamily: 'Manrope-Regular',
    fontSize: 15,
    color: Colors.textColor,
    includeFontPadding: false,
    marginLeft: 12,
  },
  radioButtonContainer: {
    padding: 10,
    marginVertical: 0,
    marginHorizontal: 0,
  }
});

export default LabeledRadioGroup;