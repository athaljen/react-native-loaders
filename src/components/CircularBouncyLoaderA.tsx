import React from "react";
import { memo, useEffect, useRef } from "react";
import { View, Animated, Easing, StyleSheet, ViewStyle } from "react-native";

export interface CircularBouncyLoaderAProps {
  /**number of dots */
  dots?: number;

  /**colors of dots */
  colors?: string[];

  /*Outer container style.*/
  containerStyle?: ViewStyle;
}

const CircularBouncyLoaderA = (props: CircularBouncyLoaderAProps) => {
  const { colors = ["#1971e4"], dots = 5, containerStyle } = props;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const dotAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
      Animated.loop(
        Animated.sequence([
          Animated.timing(dotAnimatedValue, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false,
          }),
          Animated.timing(dotAnimatedValue, {
            toValue: 0,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
        ])
      ).start();
    };

    animate();
  }, [dots]);

  const animatedStyle = {
    transform: [
      {
        rotate: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
        }),
      },
    ],
  };

  const dotPositions = Array.from(
    { length: dots },
    (_, index) => colors[index % colors.length]
  ).map((color, i) => {
    const angle = (i / dots) * 360;
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * 15;
    const y = Math.sin(radian) * 15;
    return { x, y, color, angle };
  });

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.View style={[animatedStyle, styles.innerContainer]}>
        {dotPositions.map((data, index) => (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              colors && {
                backgroundColor: data?.color,
              },
              {
                transform: [{ rotate: `${data.angle - 140 + index * 3}deg` }],
                top: dotAnimatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [data.y, data.y * 2],
                }),
                left: dotAnimatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [data.x, data.x * 2],
                }),
              },
            ]}
          />
        ))}
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
  innerContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 10,
    width: 10,
  },
  dot: {
    width: 10,
    height: 10,
    position: "absolute",
    borderRadius: 10,
  },
});
export default memo(CircularBouncyLoaderA);
