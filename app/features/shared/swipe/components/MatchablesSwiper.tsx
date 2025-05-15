import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, StyleSheet, Text } from "react-native";
import SwipeCard from "./SwipeCard";
import { Matchable } from "../store/swipeSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { voteMatchable } from "../store/swipeThunk";
import { useAppSelector } from "@/app/store/hooks";

export default function MatchableSwiper({
  swipeList,
}: {
  swipeList: Matchable[];
}) {
  const [cards, setCards] = useState<Matchable[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(0);

  const dispatch: AppDispatch = useDispatch();
  const id = useAppSelector((state) => state.auth.id);

  useEffect(() => {
    setCards(swipeList);
  }, [swipeList]);

  const handleVoting = useCallback(
    (otherUserId: string, like: boolean) => {
      dispatch(voteMatchable({ id, like, otherUserId })).catch(() =>
        setError(true)
      );
    },
    [dispatch, id]
  );

  const handleSwipe = useCallback(
    (like: boolean, otherUserId: string) => {
      setCards((prev) => prev.filter((c) => c.id !== otherUserId));
      handleVoting(otherUserId, like);
    },
    [handleVoting]
  );

  const visibleCards = cards?.slice(0, 3);


  if (error) {
    return (
      <View>
        <Text>UPS</Text>
      </View>
    );
  }

  if (visibleCards?.length === 0) {
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
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
            onSwipe={handleSwipe}
            selected={index === selected}
            setSelected={setSelected}
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
    marginTop: 20,
  },
});
