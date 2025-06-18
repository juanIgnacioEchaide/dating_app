import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

export default function NoMoreVotes() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Sucribite a Premium</Text> <Text style={styles.text}>para seguir votando</Text>
            <Image
                source={require('../../../../../assets/images/warning.png')}
                style={styles.logo}
            />

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Go Premium</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'purple',
        fontSize: 20,
    },
    logo: {
        height: 270,
        width: 210,
        marginTop: 20       
    },
    button: {
        backgroundColor: 'purple',
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 12,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
});
