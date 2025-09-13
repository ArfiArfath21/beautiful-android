import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../theme';

export function RatingStars({ rating, size = 14 }: { rating: number; size?: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <View style={{ flexDirection: 'row' }}>
      {[0, 1, 2, 3, 4].map((i) => {
        const filled = i < full || (i === full && half);
        return (
          <Feather
            key={i}
            name={filled ? 'star' : 'star'}
            size={size}
            color={filled ? '#FBBF24' : theme.colors.border}
            style={{ marginRight: 2 }}
          />
        );
      })}
    </View>
  );
}

