import { View, Text } from "react-native";
import { Matchable } from "../store/swipeSlice";

export default function SwipeCard({user}:{user: Matchable}){
    return <View>
        <Text>
            {JSON.stringify(user)}
        </Text>
    </View>
}