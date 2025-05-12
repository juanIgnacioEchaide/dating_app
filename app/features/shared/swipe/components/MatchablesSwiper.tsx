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

  // Tomamos las últimas 3, para que la que está más al final sea la top
  const visibleCards = cards.slice(-3);

  return (
    <View style={styles.container}>
      {visibleCards.map((card, index) => {
        const stackOffset = index * 10;
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
    marginTop: 20,
  },
});
