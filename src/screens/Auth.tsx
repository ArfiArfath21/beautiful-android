import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { theme } from '../theme';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { AntDesign } from '@expo/vector-icons';

export function Auth() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.pill, overflow: 'hidden', marginBottom: 16 }}>
        <Button
          variant={mode === 'login' ? 'solid' : 'subtle'}
          style={{ flex: 1, borderRadius: 0 }}
          onPress={() => setMode('login')}
        >
          <Text style={{ color: mode === 'login' ? '#fff' : theme.colors.primary }}>Sign in</Text>
        </Button>
        <Button
          variant={mode === 'signup' ? 'solid' : 'subtle'}
          style={{ flex: 1, borderRadius: 0 }}
          onPress={() => setMode('signup')}
        >
          <Text style={{ color: mode === 'signup' ? '#fff' : theme.colors.primary }}>Create account</Text>
        </Button>
      </View>

      {mode === 'signup' && (
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View style={{ flex: 1 }}>
            <Input value={first} onChangeText={setFirst} placeholder="First name" />
          </View>
          <View style={{ flex: 1 }}>
            <Input value={last} onChangeText={setLast} placeholder="Last name" />
          </View>
        </View>
      )}

      <View style={{ marginTop: 12 }}>
        <Input value={email} onChangeText={setEmail} placeholder="Email address" />
      </View>

      <View style={{ marginTop: 12 }}>
        <Input value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
      </View>

      <Button title={mode === 'login' ? 'Sign in' : 'Create account'} style={{ marginTop: 16 }} />

      <View style={{ marginTop: 24 }}>
        <Text style={{ color: theme.colors.muted, fontSize: 12, marginBottom: 8, textAlign: 'center' }}>or continue with</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {([
            { icon: 'apple1', label: 'Apple' },
            { icon: 'google', label: 'Google' },
            { icon: 'facebook-square', label: 'Facebook' },
          ] as const).map((p) => (
            <Button key={p.icon} variant="outline" style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
              <AntDesign name={p.icon as any} size={16} color={theme.colors.primary} />
              <Text style={{ marginLeft: 8, fontWeight: '600' }}>{p.label}</Text>
            </Button>
          ))}
        </View>
      </View>
    </View>
  );
}
