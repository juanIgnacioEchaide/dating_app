import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function TabFourScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}><Text>FlatList contactos 
                indicar el seleccionado 
                ENDPOINT /CHAT/CONTACTS</Text></View>
            <View style={styles.rightContainer}><Text> FlatList Texto chat seleccionado ENDPOINT /CHAT/:CHAT_ID</Text></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    leftContainer: {
        backgroundColor: 'red',
        flex: 1,
        height: 1000,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightContainer: {
        backgroundColor: 'blue',
        flex: 1,
        height: 1000,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
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
