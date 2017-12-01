import { StyleSheet } from 'react-native';
import { colors } from 'styles';

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  markerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 38,
    height: 38,
    borderRadius: 19,
  },

  marker: {
    width: 40,
    height: 40,
    borderColor: colors.white,
    borderWidth: 5,
    borderRadius: 20,
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.transparentBackground,
  },
});

export default styles;
