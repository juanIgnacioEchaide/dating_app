import { View } from "react-native";
import { Matchable } from "../store/swipeSlice";
import SwipeCard from "./SwipeCard";

export default function MatchableSwiper({ swipeList }: { swipeList: Matchable[] }) {
    return (
      <View>
        {swipeList?.map((card: Matchable) => (
          <SwipeCard key={card.id} user={card} />
        ))}
      </View>
    )
  }
  