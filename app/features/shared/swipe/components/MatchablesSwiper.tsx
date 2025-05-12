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
    console.log(`Voto: ${liked ? 'like' : 'dislike'} a ${userId}`);
    setCards((prev) => prev.filter((c) => c.id !== userId));
  };

  const visibleCards = cards.slice(0, 3);

  return (
    <View style={styles.container}>
      {visibleCards.map((card, index) => {
        const reverseIndex = visibleCards.length - 1 - index;
        const stackOffset = reverseIndex * 10 + 40;
        const isTopCard = index === visibleCards.length - 1;

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
  },
});
