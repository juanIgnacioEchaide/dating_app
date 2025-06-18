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
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  image: {
    justifyContent: 'flex-end',
    width: 90,
    height: 90,
  },
  circle: {
    width: 90,
    height: 90,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleSelected: {
    opacity: 1,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: 'transparent',
    borderRadius: 50,
  },
  iconPlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#ccc',
    borderRadius: 50,
  },
  label: {
    marginTop: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    color: 'white',
    fontSize: 16,
    width: 100,
  },
});

export default FilterButton;
