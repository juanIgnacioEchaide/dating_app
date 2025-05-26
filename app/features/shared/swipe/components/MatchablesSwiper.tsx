import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, StyleSheet, Text } from "react-native";
import SwipeCard from "./SwipeCard";
import { Matchable } from "../store/swipeSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { useAppSelector } from "@/app/store/hooks";
import TopFilterButtons from "./TopFilterButtons";

export default function MatchableSwiper({ swipeList }: { swipeList: Matchable[] }) {
  const [cards, setCards] = useState<Matchable[]>([]);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState<number>(0);
  const [showFilters, setShowFilters] = useState<boolean>(true)

  const dispatch: AppDispatch = useDispatch();
  const id = useAppSelector((state) => state.auth.id);

  useEffect(() => {
    setCards(swipeList);
  }, [swipeList]);

  const handleLike = useCallback((id: string) => {
    try {
      console.log(id)
    } catch (err) {
      console.log(err)
    }
  }, [])

  const handleDislike = useCallback((id: string) => {
    try {
      console.log(id)
    } catch (err) {
      console.log(err)
    }
  }, [])

  const handleFavorite = useCallback((id: string) => {
    try {
      console.log(id)
    } catch (err) {
      console.log(err)
    }
  }, [])

  const visibleCards = cards?.slice(0, 3);

  if (error) return <View><Text>UPS</Text></View>;
  if (!visibleCards.length) return <View><Text>loading...</Text></View>;

  return (
    <View style={styles.container}>
      <TopFilterButtons
        isTopCard={false}
        selected={selected}
        setSelected={setSelected} />

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
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            handleLike={handleLike}
            handleDislike={handleDislike}
            handleFavorite={handleFavorite}
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
