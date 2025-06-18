
import { View, Text, StyleSheet } from 'react-native'

export default function BasePage({ title, subtitle }: { title: string, subtitle: string }) {
    return <View style={styles.pageContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subtitle}</Text>
    </View>
}

const styles = StyleSheet.create({
    pageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',

    },
    title: {
        fontSize: 40,
        color: 'purple'
    },
    subTitle: {
        fontSize: 20,
        color: 'purple'
    }
})