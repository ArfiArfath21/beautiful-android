import React from 'react';
import { Pressable, View, Text } from 'react-native';
import { theme } from '../../theme';
import { Feather } from '@expo/vector-icons';

interface IconButtonProps {
  name: React.ComponentProps<typeof Feather>['name'];
  onPress?: () => void;
  badge?: number;
  size?: number;
  color?: string;
}

export function IconButton({ name, onPress, badge, size = 22, color = theme.colors.primary }: IconButtonProps) {
  return (
    <Pressable onPress={onPress} style={{ padding: 8 }} hitSlop={12}>
      <View>
        <Feather name={name} size={size} color={color} />
        {badge && badge > 0 ? (
          <View
            style={{
              position: 'absolute',
              top: -2,
              right: -2,
              minWidth: 16,
              height: 16,
              borderRadius: 8,
              backgroundColor: theme.colors.danger,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 3,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 10, fontWeight: '800' }}>{badge}</Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}

