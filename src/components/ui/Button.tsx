import React from 'react';
import { Pressable, Text, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../../theme';

type Variant = 'solid' | 'ghost' | 'outline' | 'subtle';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title?: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode;
}

export function Button({
  title,
  onPress,
  variant = 'solid',
  size = 'md',
  disabled,
  style,
  textStyle,
  children,
}: ButtonProps) {
  const padY = size === 'sm' ? 8 : size === 'lg' ? 14 : 12;
  const padX = size === 'sm' ? 12 : size === 'lg' ? 18 : 16;

  const base: ViewStyle = {
    borderRadius: theme.radius.sm,
    paddingVertical: padY,
    paddingHorizontal: padX,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  };

  const variants: Record<Variant, ViewStyle> = {
    solid: { backgroundColor: theme.colors.primary },
    ghost: { backgroundColor: 'transparent' },
    outline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.colors.border },
    subtle: { backgroundColor: theme.colors.primarySoft },
  };

  const txtBase: TextStyle = {
    fontSize: 14,
    fontWeight: '600',
    color: variant === 'solid' ? '#fff' : theme.colors.primary,
  };

  const opacity = disabled ? 0.5 : 1;

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={[base, variants[variant], { opacity }, style]}
      accessibilityRole="button"
      accessibilityLabel={title ?? undefined}
    >
      {children ? <>{children}</> : <Text style={[txtBase, textStyle]}>{title}</Text>}
    </Pressable>
  );
}
