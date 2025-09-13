import React from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

interface GradientBackgroundProps {
  style?: ViewStyle;
  borderRadius?: number;
  opacity?: number; // overall stop opacity to keep it subtle
  angleDeg?: number; // rotate gradient around center
}

// -45deg gradient (top-right to bottom-left)
// Stops: 0% #d10a0a, 50% #000000, 100% #1e1e2f
export function GradientBackground({ style, borderRadius = 0, opacity = 1, angleDeg = 45 }: GradientBackgroundProps) {
  return (
    <View style={[{ overflow: 'hidden', borderRadius }, style]}>
      <Svg width="100%" height="100%">
        <Defs>
          <LinearGradient
            id="grad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
            gradientUnits="objectBoundingBox"
            gradientTransform={`rotate(${angleDeg}, 0.5, 0.5)`}
          >
            <Stop offset="0%" stopColor="#d10a0a" stopOpacity={opacity} />
            <Stop offset="50%" stopColor="#000000" stopOpacity={opacity} />
            <Stop offset="100%" stopColor="#1e1e2f" stopOpacity={opacity} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
      </Svg>
    </View>
  );
}
