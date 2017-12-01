/* Core */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { openModal } from 'redux/ducks/ui';

/* Presentational */
import { View, Image, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';

import { colors } from 'styles';

import Modal from './components/Modal';

import styles from './styles';

class Main extends Component {
  static propTypes = {
    openModal: PropTypes.func.isRequired,
    locations: PropTypes.shape({
      loading: PropTypes.bool,
      data: PropTypes.arrayOf(PropTypes.shape({
        // user: PropTypes.shape({
        //   id: PropTypes.number,
        //   name: PropTypes.string,
        //   bio: PropTypes.string,
        //   avatar_url: PropTypes.string,
        // }),
        // coordinate: PropTypes.shape({
        //   latitude: PropTypes.string,
        //   longitude: PropTypes.string,
        // }),
      })),
    }).isRequired,
  };

  state = {
    initialRender: true,
  }

  initialState = () => ({
    latitude: -27.2177659,
    longitude: -49.6451598,
    latitudeDelta: 0.0042,
    longitudeDelta: 0.0031,
  });

  render() {
    const { locations } = this.props;

    return (
      <View style={styles.map}>
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
                onLayout={() => this.setState({ initialRender: false })}
                key={`${this.state.initialRender}`}
              />
            </MapView.Marker>
          ))}
        </MapView>
        { this.props.locations.loading
          ? <View style={styles.loading}><ActivityIndicator color={colors.black} size="large" /></View>
          : <Modal /> }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  locations: state.locations,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ openModal }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);