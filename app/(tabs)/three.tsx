import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function TabThreeScreen() {
    function MatchItem() {
        return <View style={styles.matchItemContainer}>
            <View>
                <Text>IMAGEN</Text>
            </View>
            <View>
                <Text>Sofia Cloren</Text>
                <Text>03/03/2025</Text>
                <Text>Chatear</Text>
            </View>
        </View>
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>You have a match with:</Text>
            {[1, 2, 3, 4, 5].map(item => <><View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /><MatchItem /></>)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 3,
        flex: 1,
        alignItems: 'center',
    },
    matchItemContainer: {
        flexDirection: 'row'
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
