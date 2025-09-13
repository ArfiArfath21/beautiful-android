import React, { createContext, useContext, useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import { theme } from '../theme';

type Toast = { id: number; message: string };

const ToastContext = createContext<{ showToast: (message: string) => void } | undefined>(undefined);

export function ToastProvider({ children }: React.PropsWithChildren) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 1800);
  };

  const value = useMemo(() => ({ showToast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <View pointerEvents="none" style={{ position: 'absolute', top: 12, left: 0, right: 0, alignItems: 'center', zIndex: 1000 }}>
        {toasts.map((t) => (
          <View
            key={t.id}
            style={{
              backgroundColor: '#111827',
              paddingHorizontal: 14,
              paddingVertical: 10,
              borderRadius: 10,
              marginTop: 8,
              ...theme.shadow.card,
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '700' }}>{t.message}</Text>
          </View>
        ))}
      </View>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

