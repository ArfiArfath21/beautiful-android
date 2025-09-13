export const theme = {
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    muted: '#777C85',
    border: '#E6E8EB',
    primary: '#111827',
    primarySoft: '#F3F4F6',
    accent: '#111827',
    danger: '#EF4444',
    success: '#16A34A',
    cardShadow: 'rgba(16, 24, 40, 0.06)',
  },
  radius: {
    xs: 6,
    sm: 10,
    md: 14,
    lg: 18,
    pill: 999,
  },
  spacing: (n: number) => n * 4,
  text: {
    title: 20,
    h1: 24,
    h2: 18,
    body: 14,
    small: 12,
  },
  shadow: {
    card: {
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 4,
    },
  },
} as const;

