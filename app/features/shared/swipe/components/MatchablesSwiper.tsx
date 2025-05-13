import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SwipeCard from './SwipeCard';
import { Matchable } from '../store/swipeSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { voteMatchable } from '../store/swipeThunk';
import { useAppSelector } from '@/app/store/hooks';

export default function MatchableSwiper({
  swipeList,
}: {
  swipeList: Matchable[],
}) {
  const [cards, setCards] = useState<Matchable[]>([]);
  const [error, setError] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch()
  const id = useAppSelector(state => state.auth.id)

  useEffect(() => {
    setCards(swipeList);
  }, [swipeList]);

  const handleSwipe = useCallback((like: boolean, otherUserId: string) => {
    setCards((prev) => prev.filter((c) => c.id !== otherUserId));
    handleVoting(otherUserId, false)
  }, []);

  useEffect(() => {
    if (cards)
      console.log(cards.map(i => i.name), cards.length)
  }, [cards])

  const handleVoting = useCallback((otherUserId: string, like: boolean) => {
    try {
      dispatch(voteMatchable({ id, like, otherUserId }))
    } catch (err) {
      setError(true)
    }
  }, []);

  const visibleCards = cards.slice(0, 3);

  if (error) {
    return <View><Text>UPS</Text></View>
  }
  return (
    <View style={styles.container}>
      {visibleCards.map((card, index) => {
        const stackOffset = (visibleCards.length - 1 - index) * 15;
        const isTopCard = index === 0; // Ahora la primera es la top card
        return (
          <SwipeCard
            key={card.id}
            user={card}
            index={index}
            stackOffset={stackOffset}
            isTopCard={isTopCard}
            onSwipe={handleSwipe}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    marginTop: 20,
  },
});
