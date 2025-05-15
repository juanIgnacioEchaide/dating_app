import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "expo-router";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";




export default function CustomDrawerContent(props: any) {
    const navigation = useNavigation();

    const handleLogout = () => {
        console.log('Cerrar sesión');
    };

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: '#FFB6D9' }}>
            <View>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeIcon}>
                    <Ionicons name="close" size={28} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={styles.headerContainer}>

                <View style={styles.userInfo}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/100' }}
                        style={styles.avatar}
                    />
                </View>

            </View>
            <View style={styles.userDetails}>
                <Text style={styles.username}>Nombre del Usuario</Text>
                <Text style={styles.location}>Ubicación del Usuario</Text>
            </View>
            <View style={{ flex: 1 }}>
                <DrawerItemList {...props} />
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={22} color="#fff" />
                <Text style={styles.logoutText}>Cerrar sesión</Text>
            </TouchableOpacity>
        </DrawerContentScrollView>
    );
}
const styles = StyleSheet.create({
    headerContainer: {
        paddingVertical: 20,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    closeIcon: {
        marginRight: 16,
    },
    userInfo: {
        flex: 1,
        alignItems: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#fff',
    },
    userDetails: {
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    location: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    logoutText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#fff',
    },
});
