import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import SwipeCard from './SwipeCard';
import { Matchable } from '../store/swipeSlice';

export default function MatchableSwiper({ swipeList }: { swipeList: Matchable[] }) {
  const [cards, setCards] = useState<Matchable[]>([]);

  useEffect(() => {
    setCards(swipeList);
  }, [swipeList]);

  const handleSwipe = (liked: boolean, userId: string) => {
    setCards((prev) => prev.filter((c) => c.id !== userId));
  };

  useEffect(() => {
    if (cards)
      console.log(cards.map(i => i.name), cards.length)
  }, [cards])

  const visibleCards = cards.slice(0, 3);

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
