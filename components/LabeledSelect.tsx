import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  StyleProp,
  TextStyle
} from 'react-native';
import Colors  from '../styles/colors';
import { Dropdown } from 'react-native-element-dropdown';

interface SelectData {
  name: string,
  value: any,
}

interface Props {
  data: SelectData[],
  value: any,
  setValue: React.Dispatch<React.SetStateAction<any>>,
  name: string,
  placeholder: string,
  secureTextEntry?: boolean | false,
  labelStyle?: StyleProp<TextStyle>,
  inputStyle?: StyleProp<TextStyle>,
  placeholderStyle?: StyleProp<TextStyle>,
  itemStyle?: StyleProp<TextStyle>,
}

function LabeledSelect({ data, value, setValue, name, placeholder, secureTextEntry, labelStyle, inputStyle, placeholderStyle, itemStyle }: Props): React.JSX.Element {
  return (
    <View style={styles.container}>
        <Text style={[styles.label, labelStyle]}>{name}</Text>
        <Dropdown
          data={data}
          labelField='name'
          valueField='value'
          value={value}
          onChange={(item) => setValue(item.value)}
          style={styles.select}
          containerStyle={styles.selectContainer}
          selectedTextStyle={inputStyle}
          placeholderStyle={[styles.placeholder, placeholderStyle]}
          placeholder='Berapa lama gejala sudah dialami'
          closeModalWhenSelectedItem={true}
          showsVerticalScrollIndicator={false}
          itemContainerStyle={styles.selectItemContainer}
          activeColor={Colors.textColorWhite}
          renderItem={(item) => (
            <Text style={[styles.selectItem, itemStyle]}>{item.name}</Text>
          )}
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
  select: {
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 14,
    fontFamily: 'Manrope-Regular',
  },
  placeholder: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.5)',
  },
  selectContainer: {
    backgroundColor: 'rgb(217, 217, 217)',
    padding: 18,
    borderRadius: 16,
  },
  selectItem: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: Colors.textColor,
    includeFontPadding: false,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  selectItemContainer: {
    borderRadius: 6,
  }
});

export default LabeledSelect;