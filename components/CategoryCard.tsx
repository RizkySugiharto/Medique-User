import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import Colors  from '../styles/colors';

interface Props {
  icon: any,
  name: string,
  selected?: boolean,
  onPress?: () => void,
}

function CategoryCard({ icon, name, selected, onPress }: Props): React.JSX.Element {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.card, selected && styles.cardOnSelected ]}>
        <Image source={icon} style={styles.icon}/>
        <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 18,
    borderRadius: 15,
    borderColor: Colors.primary,
    borderWidth: 2,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    width: 180,
    height: 180,
  },
  cardOnSelected: {
    backgroundColor: Colors.primary + '33',
  },
  icon: {
    width: 70,
    height: 70,
  },
  name: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: Colors.textColor,
    textAlign: 'center'
  }
});

export default CategoryCard;