import {
  View,
  StyleSheet,
  ColorValue,
  Animated,
  Easing,
  StyleProp,
  ViewStyle,
} from "react-native";
import React, { useEffect, memo } from "react";

export type EclipseProps = {
  /**color of th eclipse loader */
  color?: ColorValue;
  /**duration of one rotation*/
  duration?: number;
  /**Outer container style*/
  containerStyle?: StyleProp<ViewStyle>;
  /**inner View Style*/
  eclipseStyle?: StyleProp<ViewStyle>;
};

const EclipseLoader = (props: EclipseProps) => {
  const {
    color = "#106bcb",
    duration = 1000,
    eclipseStyle,
    containerStyle,
  } = props;
  const animation = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        useNativeDriver: true,
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
      })
    ).start();
  }, [duration, animation]);

  let transform = [
    {
      rotate: animation.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
      }),
    },
  ];

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.View
        style={[
          styles.circle,
          eclipseStyle,
          {
            transform: transform,
            backgroundColor: color,
          },
        ]}
      >
        <View style={[styles.circle, eclipseStyle, { marginLeft: 2 }]} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  circle: {
    height: 70,
    width: 70,
    borderRadius: 100,
    backgroundColor: "#ffffff",
  },
});

export default memo(EclipseLoader);
