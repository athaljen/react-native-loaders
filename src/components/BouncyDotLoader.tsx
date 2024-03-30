import {
    View,
    StyleSheet,
    Animated,
    Easing,
    StyleProp,
    ViewStyle,
  } from 'react-native';
  import React, {memo, useEffect} from 'react';
  
  export type BouncyDotProps = {
    /**duration of blink*/
    duration?: number;
  
    /**Outer container style*/
    containerStyle?: StyleProp<ViewStyle>;
  
    /**active color of dot, default black*/
    activeColor?: string;
  
    /**inactive color of dot */
    inactiveColor?: string;
  
    /**dot view style */
    dotStyle?: StyleProp<ViewStyle>;
  };
  
  const BouncyDotLoader = (props: BouncyDotProps) => {
    const {
      duration = 500,
      containerStyle,
      activeColor = '#000000',
      inactiveColor = '#b9b9b9',
      dotStyle,
    } = props;
    const animation = new Animated.Value(-1);
  
    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            useNativeDriver: true,
            toValue: 0,
            duration: duration,
            easing: Easing.linear,
          }),
          Animated.timing(animation, {
            useNativeDriver: true,
            toValue: 1,
            duration: duration,
            easing: Easing.linear,
          }),
        ]),
      ).start();
    }, [duration, animation]);
  
    return (
      <View style={[styles.container, containerStyle]}>
        <View style={styles.dotContainer}>
          <Animated.View
            style={[
              styles.circle,
              dotStyle,
              {
                backgroundColor: animation.interpolate({
                  inputRange: [-1, 0, 1],
                  outputRange: [activeColor, inactiveColor, inactiveColor],
                }),
                transform: [
                  {
                    scale: animation.interpolate({
                      inputRange: [-1, 0, 1],
                      outputRange: [1.3, 1, 1],
                    }),
                  },
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.circle,
              dotStyle,
              {
                backgroundColor: animation.interpolate({
                  inputRange: [-1, 0, 1],
                  outputRange: [inactiveColor, activeColor, inactiveColor],
                }),
                transform: [
                  {
                    scale: animation.interpolate({
                      inputRange: [-1, 0, 1],
                      outputRange: [1, 1.3, 1],
                    }),
                  },
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.circle,
              dotStyle,
              {
                backgroundColor: animation.interpolate({
                  inputRange: [-1, 0, 1],
                  outputRange: [inactiveColor, inactiveColor, activeColor],
                }),
                transform: [
                  {
                    scale: animation.interpolate({
                      inputRange: [-1, 0, 1],
                      outputRange: [1, 1, 1.3],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      height: 100,
      width: 100,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
    circle: {
      height: 10,
      width: 10,
      borderRadius: 10,
      backgroundColor: '#b9b9b9',
      marginHorizontal: 5,
    },
    dotContainer: {flexDirection: 'row', justifyContent: 'space-around'},
  });
  
  export default memo(BouncyDotLoader);
  