import { StyleSheet } from 'react-native';
import { colors, fonts } from 'styles';

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: fonts.regular,
    color: colors.white,
    fontWeight: 'bold',
  },

  'button-color-cancel': {
    backgroundColor: colors.cancel,
  },

  'button-color-success': {
    backgroundColor: colors.success,
  },
});

export default styles;
