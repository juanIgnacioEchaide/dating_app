import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SwipeCard from './SwipeCard';
import { Matchable } from '../store/swipeSlice';

export default function MatchableSwiper({ swipeList }: { swipeList: Matchable[] }) {
  const [cards, setCards] = useState(swipeList);

  const handleSwipe = (liked: boolean, userId: string) => {
    console.log(`Voto: ${liked ? 'like' : 'dislike'} a ${userId}`);
    setCards((prev) => prev.filter((c) => c.id !== userId));
  };

  return (
    <View style={styles.container}>
      {cards.map((card, index) => {
        const stackOffset = index < 3 ? index * 10 : 30;
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
    justifyContent: 'flex-start',
    paddingTop: 50,
    marginTop: 20,
  },
});
