import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Animated,
  TouchableOpacity,
  StyleProp,
  ViewStyle
} from "react-native";

const STAR_IMAGE = require( "../images/airbnb-star.png" );
const STAR_SELECTED_IMAGE = require( "../images/airbnb-star-selected.png" );
const STAR_SIZE = 40;

export type StarProps = {
  starImage?: string;
  fill?: boolean;
  size?: number;
  selectedColor?: string;
  unSelectedColor?: string;
  isDisabled?: boolean;
  starStyle?: StyleProp<ViewStyle>;
  position?: number;
  starSelectedInPosition?: ( number ) => void;
  selectedPosition?: number;
};

const Star: React.FunctionComponent<StarProps> = ({starImage = STAR_IMAGE, selectedColor = "#f1c40f", unSelectedColor = "#BDC3C7", selectedPosition, ...props}) => {
  const [selected, setSelected] = useState<boolean>( false );
  const [springValue, setSpringValue] = useState(new Animated.Value( 1 ));

  useEffect(() => {
    if (selectedPosition !== props.position) {
      setSpringValue( new Animated.Value( 1 ) );
    }
  }, [selectedPosition]);

  const spring = () => {
    const { position, starSelectedInPosition } = props;

    setSpringValue(1.2);

    Animated.spring( springValue, {
      toValue: 1,
      friction: 2,
      tension: 1,
      useNativeDriver: true
    } ).start();

    setSelected( !selected );

    starSelectedInPosition( position );
  };

  const {
    fill,
    size,
    isDisabled,
    starStyle
  } = props;

  const starSource =
    fill && selectedColor === null ? STAR_SELECTED_IMAGE : starImage;

  return (
    <TouchableOpacity activeOpacity={1} onPress={spring} disabled={isDisabled}>
      <Animated.Image
        source={starSource}
        style={[
          styles.starStyle,
          {
            tintColor: fill && selectedColor ? selectedColor : unSelectedColor,
            width: size || STAR_SIZE,
            height: size || STAR_SIZE,
            transform: [{ scale: springValue }]
          },
          starStyle
        ]}
      />
    </TouchableOpacity>
  );
};

export default Star;

const styles = StyleSheet.create( {
  starStyle: {
    margin: 3
  }
} );
