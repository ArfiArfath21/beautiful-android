import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { theme } from '../../theme';

export function QuantityStepper({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const dec = () => onChange(Math.max(1, value - 1));
  const inc = () => onChange(value + 1);
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.pill }}>
      <Pressable onPress={dec} style={{ paddingHorizontal: 12, paddingVertical: 6 }}>
        <Text style={{ fontSize: 16, fontWeight: '800' }}>−</Text>
      </Pressable>
      <Text style={{ minWidth: 24, textAlign: 'center', fontWeight: '700' }}>{value}</Text>
      <Pressable onPress={inc} style={{ paddingHorizontal: 12, paddingVertical: 6 }}>
        <Text style={{ fontSize: 16, fontWeight: '800' }}>+</Text>
      </Pressable>
    </View>
  );
}

