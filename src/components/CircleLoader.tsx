import React from "react";
import { memo, useEffect, useRef } from "react";
import {
  View,
  Animated,
  Easing,
  StyleSheet,
  ViewStyle,
  ColorValue,
} from "react-native";

export interface CircleLoaderProps {
  /*Number of dots in loader, default 5.*/
  dots?: number;

  /*Colors of dots in loader, default blue.*/
  colors?: ColorValue[];

  /*individual dot style*/
  dotStyle?: ViewStyle;

  /*Outer container style.*/
  containerStyle?: ViewStyle;

  /*duration of rotation, default 1500*/
  duration?: number;

  /*radius of dots circle, default 30 pixel.*/
  radius?: number;
}

const CircleLoader = (props: CircleLoaderProps) => {
  const {
    colors = ["#1967e4"],
    dots = 5,
    containerStyle,
    duration = 1500,
    dotStyle,
  } = props;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const dotAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(dotAnimatedValue, {
          toValue: 1,
          duration: duration,
          useNativeDriver: false,
        }),
        Animated.timing(dotAnimatedValue, {
          toValue: 0,
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [dots, dotAnimatedValue, animatedValue, duration]);

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
              dotStyle,
              { backgroundColor: data?.color },
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
    elevation: 5,
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
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
});

export default memo(CircleLoader);
