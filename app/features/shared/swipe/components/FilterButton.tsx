import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';

interface FilterButtonProps {
  label: string;
  selected: boolean;
  onPress?: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, selected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.container}>
      <View style={[styles.circle, selected && styles.circleSelected]}>
        <View style={styles.iconPlaceholder} >
          {selected && <Text style={styles.label}>{label}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create<{
  container: ViewStyle;
  circle: ViewStyle;
  circleSelected: ViewStyle;
  iconPlaceholder: ViewStyle;
  label: TextStyle;
}>({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
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
