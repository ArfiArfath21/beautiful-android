import React from 'react';
import { View, TextInput, Text, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../../theme';

interface InputProps {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  label?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
}

export function Input({ value, onChangeText, placeholder, secureTextEntry, label, style, inputStyle }: InputProps) {
  return (
    <View style={style}>
      {!!label && (
        <Text style={{ marginBottom: 6, color: theme.colors.muted, fontSize: 12, fontWeight: '600' }}>{label}</Text>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={{
          borderWidth: 1,
          borderColor: theme.colors.border,
          paddingHorizontal: 14,
          paddingVertical: 12,
          borderRadius: theme.radius.sm,
          fontSize: 14,
          backgroundColor: '#fff',
        }}
      />
    </View>
  );
}

