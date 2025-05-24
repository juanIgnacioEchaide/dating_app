import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, StyleSheet, Text } from "react-native";
import SwipeCard from "./SwipeCard";
import { Matchable } from "../store/swipeSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { voteMatchable } from "../store/swipeThunk";
import { useAppSelector } from "@/app/store/hooks";
import FilterButton from './FilterButton';
import ChoiceButton from './ChoiceButton';
import TopFilterButtons from "./TopFilterButtons";

const FILTER_BUTTONS = [
  { label: "Amistad", type: "friendship", param: "" },
  { label: "Citas", type: "dating", param: "" },
  { label: "Relación", type: "relationship", param: "" },
];

const CHOICE_BUTTONS = [
  { type: "no", param: "dislike" },
  { type: "add_to_favorites", param: "favorite" },
  { type: "yes", param: "like" },
];

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

  const handleVoting = useCallback(
    (otherUserId: string, like: boolean) => {
      dispatch(voteMatchable({ id, like, otherUserId })).catch(() => setError(true));
    },
    [dispatch, id]
  );

  const handleSwipe = useCallback(
    (like: boolean, otherUserId: string) => {
      setCards((prev) => prev.filter((c) => c.id !== otherUserId));
      handleVoting(otherUserId, like);
      setShowFilters(false)
    },
    [handleVoting]
  );

  const handleChoice = useCallback(
    (type: 'like' | 'dislike',
      params: {
        otherId: string,
        id: string,
        like: boolean
      }) => {
      if (type === 'like') {
        console.log('like if', { params })
      }
      if (type === 'dislike') {
        console.log('dislike if', { params })
      }
      console.log('dislike else', { params })

    }, []);

  const friendshipList = useMemo(() => {
    return swipeList.filter(i => i.friendship)
  }, []);

  const datingList = useMemo(() => {
    return swipeList.filter(i => i.dating)
  }, []);

  const relationshipList = useMemo(() => {
    return swipeList.filter(i => i.relationship)
  }, []);

  const selectedSwipeList = useMemo(() => {
    const matchOptions = [
      { id: 0, type: 'friendship', value: friendshipList },
      { id: 1, type: 'dating', value: datingList },
      { id: 2, type: 'relationship', value: relationshipList },
    ]
    return matchOptions[selected].value
  }, [selected, friendshipList, datingList, relationshipList])

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
            onSwipe={handleSwipe}
            selected={index === selected}
            setSelected={setSelected}
            seriesSelected={0}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
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
  topButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    gap: 12,
  },
});
