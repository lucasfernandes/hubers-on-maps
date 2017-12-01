/* Core */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Presentational */
import { View, Text, Modal, TextInput } from 'react-native';
import { colors } from 'styles';
import Button from 'pages/Main/components/Button';

/* Redux */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { closeModal } from 'redux/ducks/ui';
import { addLocation } from 'redux/ducks/locations';


import styles from './styles';

class ModalBox extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    addLocation: PropTypes.func.isRequired,
    ui: PropTypes.shape({
      modal: PropTypes.bool,
      error: PropTypes.bool,
      coordinate: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
      }),
    }).isRequired,
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
  };

  state = {
    login: '',
  }

  addLocation = () => {
    const { login } = this.state;
    const { coordinate } = this.props.ui;

    if (login === '') return;

    this.props.addLocation(login, coordinate);
  }

  render() {
    return (
      <Modal
        style={styles.container}
        onRequestClose={() => {}}
        animationType="none"
        transparent={false}
        visible={this.props.ui.modal}
      >
        <View style={styles.container}>
          <View style={styles.box}>
            <Text style={styles.title}>Adicionar novo local</Text>
            <TextInput
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Usuário no GitHub"
              placeholderTextColor={colors.dark}
              value={this.state.login}
              onChangeText={text => this.setState({ login: text })}
              style={styles.input}
              underlineColorAndroid="rgba(0, 0, 0, 0)"
            />
            <View style={styles.buttonContainer}>
              <Button
                style={styles.button}
                color="cancel"
                onPress={() => this.props.closeModal()}
              >
                Cancelar
              </Button>
              <Button
                style={styles.buttonMargin}
                color="success"
                onPress={() => this.addLocation()}
              >
                Salvar
              </Button>
            </View>
          </View>
          { this.props.locations.error &&
            <Text style={styles.error}>{this.props.locations.errorMessage}</Text>}
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  locations: state.locations,
  ui: state.ui,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ closeModal, addLocation }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModalBox);

