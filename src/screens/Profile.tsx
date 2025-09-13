import React from 'react';
import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import { theme } from '../theme';
import { Feather } from '@expo/vector-icons';

export function Profile() {
  return (
    <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: theme.radius.lg,
          borderWidth: 1,
          borderColor: theme.colors.border,
          padding: 16,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1688888745596-da40843a8d45?q=80&w=400&auto=format&fit=crop' }}
            style={{ width: 56, height: 56, borderRadius: 28, marginRight: 12 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: '800' }}>Asma Syed</Text>
            <Text style={{ color: theme.colors.muted, marginTop: 2 }}>dummy_email@gmail.com</Text>
          </View>
          <Pressable style={{ padding: 8 }}>
            <Feather name="edit-2" size={18} color={theme.colors.primary} />
          </Pressable>
        </View>
      </View>

      <View style={{ height: 12 }} />

      <View style={{ flexDirection: 'row' }}>
        {[{ icon: 'package', label: 'Orders' }, { icon: 'heart', label: 'Wishlist' }, { icon: 'map-pin', label: 'Addresses' }].map(
          (it, idx) => (
            <View
              key={idx}
              style={{
                flex: 1,
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: theme.colors.border,
                borderRadius: theme.radius.md,
                paddingVertical: 16,
                alignItems: 'center',
                marginRight: idx < 2 ? 8 : 0,
              }}
            >
              <Feather name={it.icon as any} size={18} color={theme.colors.primary} />
              <Text style={{ marginTop: 6, fontWeight: '700' }}>{it.label}</Text>
            </View>
          )
        )}
      </View>

      <View style={{ height: 12 }} />

      <View style={{ backgroundColor: '#fff', borderRadius: theme.radius.lg, borderWidth: 1, borderColor: theme.colors.border }}>
        {[
          { icon: 'user', label: 'Account details' },
          { icon: 'credit-card', label: 'Payment methods' },
          { icon: 'map', label: 'Saved addresses' },
          { icon: 'bell', label: 'Notifications' },
          { icon: 'help-circle', label: 'Help & support' },
          { icon: 'log-out', label: 'Sign out' },
        ].map((it, i, arr) => (
          <View
            key={it.label}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 14,
              borderBottomWidth: i < arr.length - 1 ? 1 : 0,
              borderBottomColor: theme.colors.border,
            }}
          >
            <Feather name={it.icon as any} size={18} color={theme.colors.primary} />
            <Text style={{ marginLeft: 12, fontSize: 14, fontWeight: '600', flex: 1 }}>{it.label}</Text>
            <Feather name="chevron-right" size={18} color={theme.colors.muted} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

