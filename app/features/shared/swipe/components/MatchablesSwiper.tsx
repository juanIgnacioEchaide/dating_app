import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, StyleSheet, Text } from "react-native";
import SwipeCard from "./SwipeCard";
import { Matchable } from "../store/swipeSlice";
import { AppDispatch } from "@/app/store";
import { useAppSelector } from "@/app/store/hooks";
import TopFilterButtons from "./TopFilterButtons";
import { useSharedValue, useDerivedValue, runOnJS } from "react-native-reanimated";

import NoMoreVotes from "./NoMoreVotes";
import SwipeFeedback from "./SwipeFeedback";

export default function MatchableSwiper({ 
  swipeList, 
  loading, 
  error,
 }: { swipeList: Matchable[]; loading: boolean; error: string }) {
  const [cards, setCards] = useState<Matchable[]>([]);
  const [selected, setSelected] = useState<number>(0);
  const [isUserSwiping, setIsUserSwiping] = useState(false);
  const [feedback, setFeedback] = useState<null | "like" | "dislike" | "favorite">(null);
  const [pendingCardId, setPendingCardId] = useState<string | null>(null);
  const isEmpty = useMemo(() => {
    return cards?.length === 0
  },[cards])
  const isSwiping = useSharedValue(false);

  useEffect(() => {
    setCards(swipeList);
  }, [swipeList]);

  useDerivedValue(() => {
    runOnJS(setIsUserSwiping)(isSwiping.value);
  }, [isSwiping]);

  const handleLike = useCallback((swipedId: string) => {
    console.log("Liked:", swipedId);
    setFeedback('like')
    setCards(prevCards => prevCards.filter(card => card.id !== swipedId));
  }, []);

  const handleDislike = useCallback((swipedId: string) => {
    console.log("Disliked:", swipedId);
    setFeedback('dislike')
    setCards(prevCards => prevCards.filter(card => card.id !== swipedId));
  }, []);

  const handleFavorite = useCallback((swipedId: string) => {
    console.log("Favorited:", swipedId);
    setFeedback('favorite')
    setCards(prevCards => prevCards.filter(card => card.id !== swipedId));
  }, []);

  const handleFeedbackDone = () => {
    if (pendingCardId) {
      setCards(prev => prev.filter(c => c.id !== pendingCardId));
      setPendingCardId(null);
    }
    setFeedback(null);
  };

  const visibleCards = cards?.slice(0, 3);

  if (error) return <View><Text>UPS</Text></View>;
  if (loading) return <View><Text>loading...</Text></View>;
  if (isEmpty) return <NoMoreVotes />;

  return (
    <View style={styles.container}>
      {!isUserSwiping && (
        <TopFilterButtons
          isTopCard={false}
          selected={selected}
          setSelected={setSelected}
        />
      )}
      <SwipeFeedback
        visible={feedback !== null}
        type={feedback || "like"}
        onDone={handleFeedbackDone}
      />

      {visibleCards.map((card, index) => {
        const stackOffset = (visibleCards.length - 1 - index) * 15;
        const isTopCard = index === 0;

        return (
          <SwipeCard
            key={card.id}
            user={card}
            index={index}
            stackOffset={stackOffset}
            isTopCard={isTopCard}
            selected={index === selected}
            setSelected={setSelected}
            seriesSelected={0}
            showFilters={!isUserSwiping}
            setShowFilters={() => { }}
            handleLike={handleLike}
            handleDislike={handleDislike}
            handleFavorite={handleFavorite}
            isSwiping={isSwiping}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    marginTop: 90,
  },
});
