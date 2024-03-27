import React from "react";
import { memo, useEffect, useRef } from "react";
import { View, Animated, Easing, StyleSheet, ViewStyle } from "react-native";

export interface CircularBouncyLoaderProps {
  NumberOfDots?: number;

  /*.*/
  colors?: ViewStyle["backgroundColor"][];

  /*dot style, u can change to square/ water drop like shape.*/
  dotStyle?: ViewStyle;

  /*Dot color(i.e applied to all dots).*/
  dotColor?: ViewStyle["backgroundColor"];

  /*Outer container style.*/
  containerStyle?: ViewStyle;

  /*duration of rotation,by default initial dot 1 cycle delay 750 plus 150 delay on every other dot.*/
  duration?: number;

  /*radius of dots circle, default 30 pixel.*/
  radius?: number;
}

const defaultColors = ["#173f5f", "#3faea4", "#3faea4", "#f6d55c", "#ed553b"];

const CircularBouncyLoader = (props: CircularBouncyLoaderProps) => {
  const {
    colors = defaultColors,
    NumberOfDots = 5,
    dotStyle,
    dotColor,
    containerStyle,
    duration = 900,
    radius = 30,
  } = props;

  const animationArray = Array.from(
    { length: NumberOfDots },
    (_: any, index: number) => ({
      animation: new Animated.Value(0),
      color: colors?.[index % colors?.length],
    })
  );

  useEffect(() => {
    Animated.loop(
      Animated.parallel(
        animationArray.map((item, index) =>
          Animated.timing(item.animation, {
            toValue: 1,
            duration: duration + index * 150,
            useNativeDriver: false,
            delay: (index + 1) * 35,
          })
        )
      )
    ).start();
  }, [animationArray, duration]);

  return (
    <View style={[styles.container, containerStyle]}>
      {animationArray.map((data, index) => (
        <Animated.View
          key={index}
          style={[
            styles.dotContainer,
            {
              height: radius * 2,
              zIndex: -index,
              transform: [
                {
                  rotate: data.animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "360deg"],
                  }),
                },
              ],
            },
          ]}
        >
          <View
            style={[
              styles.dots,
              dotStyle,
              { backgroundColor: dotColor ? dotColor : data?.color },
            ]}
          />
        </Animated.View>
      ))}
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
  dotContainer: {
    borderRadius: 5,
    position: "absolute",
  },
  dots: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
});

export default memo(CircularBouncyLoader);
