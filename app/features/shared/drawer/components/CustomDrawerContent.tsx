import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

export default function CustomDrawerContent(props: any) {
    const handleLogout = () => {
        console.log('Cerrar sesión');
    };

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: 'purple' }}>
            <View>
                <TouchableOpacity onPress={() => props.navigation.closeDrawer()} style={styles.closeIcon}>
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
                <Text style={styles.username}>John Mock</Text>
                <Text style={styles.location}>Lima</Text>
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
        marginLeft: 0,
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
        width: 100,
        height: 100,    
        borderRadius: 50,
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
