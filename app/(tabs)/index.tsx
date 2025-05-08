import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.statsContainers}>
        <Text style={styles.title}>Matches</Text>
        <Text style={styles.title}>Views</Text>
        <Text style={styles.title}>Favorites</Text>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.statsContainers}>
        <Text style={styles.title}>10</Text>
        <Text style={styles.title}>100</Text>
        <Text style={styles.title}>2</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainers:{
    gridAutoColumns: 'true',
    flexDirection: 'row',
    justifyContent: 'space-between' 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
