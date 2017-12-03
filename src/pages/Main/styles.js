import { StyleSheet } from 'react-native';
import { colors, fonts, metrics } from 'styles';

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

  callOut: {
    flex: -1,
    position: 'absolute',
    width: 200,
    minHeight: 10,
  },

  callOutRemove: {
    color: colors.red,
    fontSize: fonts.hair,
    padding: metrics.tinyPadding,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.danger,
  },

  callOutTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  callOutTitle: {
    fontSize: fonts.middle,
    color: colors.black,
    fontWeight: 'bold',
  },
  callOutSub: {
    marginTop: 3,
    fontSize: fonts.tiny,
    lineHeight: 17,
  },
});

export default styles;
