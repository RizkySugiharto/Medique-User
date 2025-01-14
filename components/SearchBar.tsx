import React from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import DynamicSearchBar from "react-native-dynamic-search-bar";
import Colors  from '../styles/colors';

interface Props {
  placeholder: string,
  value: string,
  onChangeText: React.Dispatch<React.SetStateAction<string>>,
}

function SearchBar({ placeholder, value, onChangeText }: Props): React.JSX.Element {
  return (
    <DynamicSearchBar
      value={value}
      onChangeText={onChangeText}
      clearButtonMode='never'
      textInputStyle={styles.searchInput}
      searchIconImageSource={require('../assets/img/ic_search.png')}
      searchIconImageStyle={{ width: 32, height: 32 }}
      clearIconImageStyle={{ display: 'none' }}
      placeholderTextColor={Colors.textColorSecondary}
      placeholder={placeholder}
      style={styles.searchBar}/>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    borderColor: Colors.primary,
    borderRadius: 18,
    borderWidth: 1,
    height: 56,
    width: '100%',
  },
  searchInput: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: Colors.textColor,
  },
});

export default SearchBar;