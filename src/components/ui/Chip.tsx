import React from 'react';
import { Pressable, Text } from 'react-native';
import { theme } from '../../theme';

export function Chip({ label, selected, onPress }: { label: string; selected?: boolean; onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: theme.radius.pill,
        borderWidth: 1,
        borderColor: selected ? theme.colors.primary : theme.colors.border,
        backgroundColor: selected ? '#F5F7FB' : '#fff',
        marginRight: 8,
      }}
    >
      <Text style={{ fontSize: 12, fontWeight: '600', color: selected ? theme.colors.primary : theme.colors.muted }}>{label}</Text>
    </Pressable>
  );
}

