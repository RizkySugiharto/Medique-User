import React, { useState } from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  View,
  Image,
  ImageStyle,
  TextInput,
} from 'react-native';
import DynamicSearchBar from "react-native-dynamic-search-bar";
import Colors  from '../styles/colors';
import Modal from "react-native-modal";

interface Props {
  placeholder: string,
  value: string,
  onChangeText: React.Dispatch<React.SetStateAction<string>>,
  renderFilter?: (
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
  ) => React.ReactNode | React.ReactElement,
  renderFilterContent?: (
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  ) => React.ReactNode | React.ReactElement,
  searchIconStyle?: StyleProp<ImageStyle>,
  searchBarStyle?: StyleProp<ViewStyle>,
  searchInputStyle?: StyleProp<ViewStyle>,
}

function SearchBar({
  placeholder,
  value,
  onChangeText,
  searchIconStyle,
  searchBarStyle,
  searchInputStyle,
  renderFilter,
  renderFilterContent
}: Props): React.JSX.Element {
  const [isFilter, setIsFilter] = useState(false);

  return (
    <>
    { renderFilter ?
    <View style={[
      styles.searchBar,
      searchBarStyle,
      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }
    ]}>
      { renderFilterContent &&
      <Modal
        isVisible={isFilter}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        swipeDirection={'down'}
        useNativeDriverForBackdrop={true}
        containerMarginMultiplier={0}
        onSwipeComplete={() => setIsFilter(!isFilter)}>
        { renderFilterContent(isFilter, setIsFilter ) }
      </Modal>
      }
      <View style={{ paddingLeft: 10, paddingRight: 12 }}>
        <Image source={require('../assets/img/ic_search.png')} style={[
          { width: 32, height: 32 },
          searchIconStyle
        ]} />
      </View>
      <View style={{ flex: 1 }}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.textColorSecondary}
          numberOfLines={1}
          multiline={false}
          style={[styles.searchInput, searchInputStyle]}
          />
      </View>
      { renderFilter(isFilter, setIsFilter) }
    </View>
    :
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
    }
    </>
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