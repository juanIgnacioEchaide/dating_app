import { View, Text, StyleSheet, TouchableOpacity, Image, TextStyle, ViewStyle, ImageStyle } from 'react-native';
import React from 'react';
export type LabelType = 'Amistad' | 'Citas' | 'Relación';

interface FilterButtonProps {
  label: LabelType;
  selected: boolean;
  onPress?: () => void;
}

const icons: Record<LabelType, any> = {
  Amistad: require('@/assets/images/friendship-icon.png'),
  Citas: require('@/assets/images/dating-icon.png'),
  Relación: require('@/assets/images/relationship-icon.png'),
};

const FilterButton: React.FC<FilterButtonProps> = ({ label, selected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.container}>
      <View style={[styles.circle, selected && styles.circleSelected]}>
        <Image source={icons[label]} style={styles?.image} resizeMode="contain" />
      </View>
      {selected && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create<{
  container: ViewStyle;
  circle: ViewStyle;
  circleSelected: ViewStyle;
  image: ImageStyle;
  iconPlaceholder: ViewStyle;
  label: TextStyle;
}>({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    backgroundColor: 'red',
  },
  image: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 78,
    height: 78,
    aspectRatio: 1,
  },
  circle: {
    display: 'flex',
    width: 90,
    height: 90,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 45,
  },
  circleSelected: {
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
    borderWidth: 4,
    borderColor: '#fff',
    borderRadius: 45,


  },
  iconPlaceholder: {
    width: 90,
    height: 90,
    backgroundColor: '#ccc',
    borderRadius: 45,
  },
  label: {
    fontWeight: 'bold',
    justifyContent: 'center',
    color: 'white',
  },
});

export default FilterButton;
