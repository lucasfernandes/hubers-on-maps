/* Core */
import React from 'react';
import PropTypes from 'prop-types';
// import { Style } from 'react-style-proptype/src/Style.flow';

/* Presentational */
import {
  Text,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  // StyleSheet
} from 'react-native';

import styles from './styles';

// const ButtonComponent = (Platform.OS === 'ios')
//   ? TouchableOpacity
//   : TouchableNativeFeedback;

const ButtonComponent = TouchableOpacity;

const Button = ({ color, children, ...props }) => (
  <ButtonComponent
    {...props}
    style={[
      styles.buttonContainer,
      styles[`button-color-${color}`],
      props.style,
    ]}
    activeOpacity={0.6}
  >
    <Text style={styles.buttonText}>{ children }</Text>
  </ButtonComponent>
);

Button.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
  style: Text.propTypes.style,
};

Button.defaultProps = {
  color: 'dark',
  style: {},
};

export default Button;

