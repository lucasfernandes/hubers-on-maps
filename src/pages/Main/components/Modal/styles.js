import { StyleSheet, Platform } from 'react-native';
import { colors, fonts } from 'styles';

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
    paddingTop: 5,
  },

  box: {
    flex: 1,
    maxHeight: 175,
    marginHorizontal: 20,
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
    marginBottom: 20,
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
        paddingLeft: 20,
      },
      android: {
        padding: 6,
        paddingLeft: 20,
      },
    }),

  },

  buttonContainer: {
    marginTop: 10,
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

});

export default styles;
