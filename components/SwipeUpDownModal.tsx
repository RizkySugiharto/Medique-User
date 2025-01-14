import React, { useState, useRef, useEffect, ReactElement } from "react";

import {
  Modal,
  View,
  StyleSheet,
  Animated,
  Dimensions,
  PanResponder,
  TouchableWithoutFeedback,
  Easing,
  ImageBackground,
  Keyboard,
  StyleProp,
  ViewStyle,
  ImageStyle,
  NativeSyntheticEvent,
} from "react-native";

const { height } = Dimensions.get("window");

interface SwipeUpDownModalProps {
  modalVisible: boolean,
  ContentModal?: ReactElement,
  ContentModalStyle?: StyleProp<ViewStyle>,
  HeaderContent?: ReactElement,
  HeaderStyle?: StyleProp<ViewStyle>,
  onClose: (event?: NativeSyntheticEvent<any> | undefined) => void,
  ImageBackgroundModal?: any,
  ImageBackgroundModalStyle?: StyleProp<ImageStyle>,
  duration?: number,
  DisableHandAnimation?: boolean,
  PressToanimate: boolean,
  PressToanimateDirection?: 'up' | 'down',
  OpenModalDirection?: 'up' | 'down',
  fade?: boolean,
  MainContainerModal?: StyleProp<ViewStyle>
}

const SwipeUpDownModal = (props: SwipeUpDownModalProps) => {
  const TIMING_CONFIG = {
    duration: props.duration ? props.duration : 450,
    easing: Easing.inOut(Easing.ease),
  };

  const pan = useRef(new Animated.ValueXY()).current;

  let [isAnimating, setIsAnimating] = useState(
    props.DisableHandAnimation ? true : false
  );

  let animatedValueX = 0;

  let animatedValueY = 0;

  const panResponder = useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: () => false,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (isAnimating) {
          return false;
        }
        if (gestureState.dy > 22) {
          return true;
        }
        return false;
      },
      onPanResponderGrant: () => {
        pan.setOffset({
          x: animatedValueX,
          y: animatedValueY,
        });
        pan.setValue({ x: 0, y: 0 }); // Initial value
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          pan.setValue({ x: 0, y: gestureState.dy });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        // Flatten the offset so it resets the default positioning
        if (gestureState.dy > 0 && gestureState.vy > 0) {
          if (gestureState.vy <= -0.7 || gestureState.dy <= -100) {
            setIsAnimating(true);
            Animated.timing(pan, {
              toValue: { x: 0, y: -height },
              ...TIMING_CONFIG,
              useNativeDriver: false,
            }).start(() => {
              setIsAnimating(false);
              props.onClose();
            });
          } else if (gestureState.vy >= 0.5 || gestureState.dy >= 100) {
            setIsAnimating(true);
            Animated.timing(pan, {
              toValue: { x: 0, y: height },
              ...TIMING_CONFIG,
              useNativeDriver: false,
            }).start(() => {
              setIsAnimating(false);
              props.onClose();
            });
          } else {
            setIsAnimating(true);
            Animated.spring(pan, {
              toValue: 0,
              useNativeDriver: false,
            }).start(() => {
              setIsAnimating(false);
              // props.onClose();
            });
          }
        } else {
          setIsAnimating(true);
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: false,
          }).start(() => {
            setIsAnimating(false);
            // props.onClose();
          });
        }
      },
    })
  ).current;

  useEffect(() => {
    if (props.modalVisible) {
      animatedValueX = 0;
      animatedValueY = 0;
      pan.setOffset({
        x: animatedValueX,
        y: animatedValueY,
      });
      pan.setValue({
        x: 0,
        y: props.OpenModalDirection == "up" ? -height : height,
      }); // Initial value
      pan.x.addListener((value) => (animatedValueX = value.value));
      pan.y.addListener((value) => (animatedValueY = value.value));
    }
  }, [props.modalVisible]);

  useEffect(() => {
    if (props.PressToanimate) {
      setIsAnimating(true);
      Animated.timing(pan, {
        toValue: {
          x: 0,
          y: props.PressToanimateDirection == "up" ? -height : height,
        },
        ...TIMING_CONFIG,
        useNativeDriver: false,
      }).start(() => {
        setIsAnimating(false);
        props.onClose();
      });
    }
  }, [props.PressToanimate]);

  let handleGetStyle = (opacity: Animated.AnimatedInterpolation<string | number>) => {
    return [
      [
        styles.container,
        {
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
          opacity: opacity,
        },
        [props.HeaderStyle],
      ],
    ];
  };

  let handleGetStyleBody = (opacity: Animated.AnimatedInterpolation<string | number>) => {
    return [
      [
        styles.background,
        {
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
          opacity: opacity,
        },
      ],
      [props.ContentModalStyle],
    ];
  };
  let handleMainBodyStyle = (opacity: Animated.AnimatedInterpolation<string | number>) => {
    return [
      [
        styles.ContainerModal,
        {
          opacity: opacity,
        },
      ],
      [props.MainContainerModal],
    ];
  };

  let interpolateBackgroundOpacity = pan.y.interpolate({
    inputRange: [-height, 0, height],
    outputRange: [props.fade ? 0 : 1, 1, props.fade ? 0 : 1],
  });

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.modalVisible}
      onShow={() => {
        setIsAnimating(true);
        Animated.timing(pan, {
          ...TIMING_CONFIG,
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start(() => {
          setIsAnimating(false);
        });
      }}
      onRequestClose={props.onClose}
    >
      <Animated.View style={handleMainBodyStyle(interpolateBackgroundOpacity)}>
        <Animated.View
          style={handleGetStyle(interpolateBackgroundOpacity)}
          {...panResponder.panHandlers}
        >
          <TouchableWithoutFeedback>
            {props.HeaderContent ? props.HeaderContent : <View />}
          </TouchableWithoutFeedback>
        </Animated.View>
        <Animated.View
          style={handleGetStyleBody(interpolateBackgroundOpacity)}
          {...panResponder.panHandlers}
        >
          <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
            style={styles.TouchWithoutFeedBack}
          >
            <ImageBackground
              source={props.ImageBackgroundModal && props.ImageBackgroundModal}
              style={styles.ImageBackground}
              imageStyle={
                props.ImageBackgroundModalStyle &&
                props.ImageBackgroundModalStyle
              }
            >
              {props.ContentModal}
            </ImageBackground>
          </TouchableWithoutFeedback>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    opacity: 0,
  },
  container: {
    marginTop: 50,
    width: "100%",
  },
  ContainerModal: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: 'flex-end'
  },
  ImageBackground: {
    width: "100%",
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  TouchWithoutFeedBack: { flex: 1 },
});

export default SwipeUpDownModal;