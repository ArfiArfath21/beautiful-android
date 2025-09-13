import React from 'react';
import { View, Text } from 'react-native';
import { theme } from '../theme';

export function Placeholder({ title }: { title: string }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <Text style={{ fontSize: 20, fontWeight: '800', marginBottom: 8 }}>{title}</Text>
      <Text style={{ color: theme.colors.muted }}>Coming soon.</Text>
    </View>
  );
}

