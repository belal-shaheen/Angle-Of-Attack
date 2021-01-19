import React, {Component} from 'react';

import {View, Animated, Dimensions, ImageBackground} from 'react-native';

import bg from './assets/image.png';
import needle from './assets/Needle.png';

const windowWidth = Dimensions.get('window').width;

class Angle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      angle: new Animated.Value(-1),
    };
  }

  render() {
    // Getting the value of the sensor and parsing it as a float
    let toValue = parseFloat(parseFloat(this.props.value).toFixed(2));

    // Checking if the value is valid
    if (isNaN(toValue) || this.props.status === 'Disconnected') {
      toValue = -1;
    }

    // Starting the animation of the AoA indicator
    Animated.timing(this.state.angle, {
      toValue: toValue,
      duration: 100,
      useNativeDriver: true,
    }).start();

    // Setting up the rotation range
    const rotate = this.state.angle.interpolate({
      inputRange: [-1.2, 0.9],
      outputRange: ['-50deg', '50deg'],
    });

    return (
      <View>
        <ImageBackground
          source={bg}
          style={{width: windowWidth * 0.92, height: windowWidth * 0.92}}>
          <Animated.View style={{transform: [{rotate}], left: 110, top: 180}}>
            <Animated.Image
              source={needle}
              style={{
                width: windowWidth * 4.4 * 0.13,
                height: windowWidth * 0.53 * 0.13,
              }}
            />
          </Animated.View>
        </ImageBackground>
      </View>
    );
  }
}

export default Angle;
