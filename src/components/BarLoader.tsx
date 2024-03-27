import React from "react";
import { memo, useEffect, useRef } from "react";
import { View, Animated, Easing, StyleSheet, ViewStyle } from "react-native";

export interface BarLoaderProps {
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

const defaultColors = ["#095695", "#3faea4", "#8b2ccf", "#f6d55c", "#ed553b"];

const BarLoader = (props: BarLoaderProps) => {
  const {
    colors = defaultColors,
    NumberOfDots = 5,
    containerStyle,
    duration = 600,
  } = props;

  const animationArray = Array.from(
    { length: NumberOfDots },
    (_: any, index: number) => ({
      animation: new Animated.Value(0),
      color: colors[index % colors.length],
    })
  );

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel(
          animationArray.map((item, index) =>
            Animated.timing(item.animation, {
              toValue: 1,
              duration: 600,
              delay: index % 2 == 0 ? 550 : 0,
              useNativeDriver: false,
              easing: Easing.linear,
            })
          )
        ),
        Animated.parallel(
          animationArray.map((item, index) =>
            Animated.timing(item.animation, {
              toValue: 0,
              duration: 600,
              delay: index % 2 == 0 ? 550 : 0,
              useNativeDriver: false,
              easing: Easing.linear,
            })
          )
        ),
      ])
    ).start();
  }, [animationArray, duration]);

  return (
    <View style={[styles.container, containerStyle]}>
      {animationArray.map((data, index) => (
        <Animated.View
          key={index}
          style={[
            styles.dotContainer,
            { backgroundColor: data.color },
            {
              transform: [
                {
                  scaleY: data.animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                  }),
                },
              ],
            },
          ]}
        />
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
    flexDirection: "row",
    elevation: 5,
  },
  dotContainer: {
    height: 50,
    width: 8,
    marginHorizontal: 2,
    borderRadius: 10,
  },
});
export default memo(BarLoader);
