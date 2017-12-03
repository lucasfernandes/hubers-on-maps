/* Core */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { openModal } from 'redux/ducks/ui';
import { removeMarker } from 'redux/ducks/locations';

/* Presentational */
import { View, Image, Text, TouchableWithoutFeedback, Platform } from 'react-native';
import MapView from 'react-native-maps';

import Modal from './components/Modal';

import styles from './styles';

class Main extends Component {
  static propTypes = {
    openModal: PropTypes.func.isRequired,
    locations: PropTypes.shape({
      error: PropTypes.bool,
      loading: PropTypes.bool,
      data: PropTypes.arrayOf(PropTypes.shape({
        coordinate: PropTypes.shape({
          latitude: PropTypes.number,
          longitude: PropTypes.number,
        }),
      })),
    }).isRequired,
    removeMarker: PropTypes.func.isRequired,
  };

  initialState = () => ({
    latitude: -27.2177659,
    longitude: -49.6451598,
    latitudeDelta: 0.0042,
    longitudeDelta: 0.0031,
  });

  removeMarker = (marker) => {
    this.props.removeMarker(marker);
  }

  renderCalloutIos = marker => (
    <MapView.Callout style={styles.callOut}>
      <View style={styles.callOutTitleContainer}>
        <Text style={styles.callOutTitle}>{marker.user.name}</Text>
        <TouchableWithoutFeedback onPress={() => this.removeMarker(marker)}>
          <View>
            <Text style={styles.callOutRemove}>Remover</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <Text style={styles.callOutSub} numberOfLines={3}>{marker.user.bio}</Text>
    </MapView.Callout>
  );

  renderCalloutAndroid = marker => (
    <MapView.Callout style={styles.callOut} onPress={() => this.removeMarker(marker)}>
      <View style={styles.callOutTitleContainer}>
        <Text style={styles.callOutTitle}>{marker.user.name}</Text>
        <View>
          <Text style={styles.callOutRemove}>Remover</Text>
        </View>
      </View>
      <Text style={styles.callOutSub} numberOfLines={3}>{marker.user.bio}</Text>
    </MapView.Callout>
  );

  render() {
    const { locations } = this.props;

    return (
      <View style={styles.map}>
        <Image />
        <MapView
          style={styles.map}
          region={this.initialState()}
          onLongPress={e => this.props.openModal(e.nativeEvent.coordinate)}
        >
          {locations.data.map(marker => (
            <MapView.Marker
              key={marker.user.id}
              coordinate={marker.marker}
              title={marker.user.name}
              description={marker.user.bio}
            >
              <Image
                style={styles.marker}
                source={{ uri: marker.user.avatar_url }}
              />

              { Platform.OS === 'ios'
                ? this.renderCalloutIos(marker)
                : this.renderCalloutAndroid(marker)}
            </MapView.Marker>
          ))}
        </MapView>
        <Modal />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  locations: state.locations,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ openModal, removeMarker }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
