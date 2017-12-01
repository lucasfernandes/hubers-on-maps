import { StyleSheet, Platform } from 'react-native';
import { colors, fonts, metrics } from 'styles';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.transparentBackground,
    justifyContent: 'center',
  },

  error: {
    color: colors.danger,
    fontWeight: 'bold',
    fontSize: fonts.regular,
    alignSelf: 'center',
    paddingTop: metrics.tinyPadding,
  },

  box: {
    flex: 1,
    maxHeight: 175,
    marginHorizontal: metrics.baseMargin,
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 5,
    zIndex: 1,
  },

  title: {
    alignSelf: 'center',
    fontSize: fonts.big,
    color: colors.darker,
    fontWeight: 'bold',
    marginBottom: metrics.baseMargin,
  },

  input: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: colors.lighter,
    borderRadius: 5,
    fontSize: fonts.regular,
    color: colors.dark,
    ...Platform.select({
      ios: {
        padding: 12,
        paddingLeft: metrics.basePadding,
      },
      android: {
        padding: 6,
        paddingLeft: metrics.basePadding,
      },
    }),

  },

  buttonContainer: {
    marginTop: metrics.smallMargin,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  button: {
    flex: 1,
  },

  buttonMargin: {
    marginLeft: 15,
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    marginTop: metrics.baseMargin,
  },

});

export default styles;
