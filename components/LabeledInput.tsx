import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import Colors  from '../styles/colors';

interface Props {
  value: string,
  setValue?: React.Dispatch<React.SetStateAction<string>>,
  name?: string,
  placeholder?: string,
  multiline?: boolean,
  numberOfLines?: number,
  secureTextEntry?: boolean | false,
  readOnly?: boolean,
  containerStyle?: StyleProp<ViewStyle>,
  labelStyle?: StyleProp<TextStyle>,
  inputContainerStyle?: StyleProp<ViewStyle>,
  inputStyle?: StyleProp<TextStyle>,
  renderRight?: () => React.ReactNode | React.ReactElement,
  renderLeft?: () => React.ReactNode | React.ReactElement,
}

function LabeledInput({
  value,
  setValue,
  name,
  placeholder,
  secureTextEntry,
  readOnly,
  multiline,
  numberOfLines,
  labelStyle,
  containerStyle,
  inputContainerStyle,
  inputStyle,
  renderRight,
  renderLeft,
}: Props): React.JSX.Element {
  if (!readOnly && !setValue) {
    throw Error('setValue property is required if readOnly is false or undefined')
  }
  
  return (
    <View style={[styles.container, containerStyle]}>
      { name && <Text style={[styles.label, labelStyle]}>{name}</Text> }
      <View style={[styles.inputContainer, inputContainerStyle]}>
        {renderLeft && renderLeft()}
        <TextInput
          value={value}
          multiline={multiline}
          numberOfLines={numberOfLines}
          readOnly={readOnly}
          textAlignVertical='top'
          onChangeText={setValue}
          placeholderTextColor='rgba(0, 0, 0, 0.5)'
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          style={[styles.input, inputStyle]}/>
        {renderRight && renderRight()}
      </View>
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
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    overflow: 'hidden',
    includeFontPadding: false,
    height: 46,
    textAlignVertical: 'center',
  },
});

export default LabeledInput;