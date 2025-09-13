import React from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../../theme';

type Variant = 'neutral' | 'danger' | 'success' | 'primary';

export function Badge({
  children,
  variant = 'primary',
  style,
  textStyle,
}: React.PropsWithChildren<{ variant?: Variant; style?: ViewStyle; textStyle?: TextStyle }>) {
  const colors: Record<Variant, { bg: string; fg: string }> = {
    neutral: { bg: theme.colors.primarySoft, fg: theme.colors.primary },
    danger: { bg: '#FEE2E2', fg: theme.colors.danger },
    success: { bg: '#DCFCE7', fg: theme.colors.success },
    primary: { bg: '#EEF2FF', fg: theme.colors.accent },
  };
  return (
    <View
      style={[
        {
          backgroundColor: colors[variant].bg,
          borderRadius: theme.radius.pill,
          paddingHorizontal: 8,
          paddingVertical: 4,
          alignSelf: 'flex-start',
        },
        style,
      ]}
    >
      <Text style={[{ color: colors[variant].fg, fontSize: 12, fontWeight: '600' }, textStyle]}>{children}</Text>
    </View>
  );
}

