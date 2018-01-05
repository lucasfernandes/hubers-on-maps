import React from 'react';

import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { closeModal } from 'redux/ducks/ui';
import { addLocation } from 'redux/ducks/locations';

import Modal from 'pages/Main/components/Modal';
import Button from 'pages/Main/components/Button';

import { TextInput, ActivityIndicator, Text } from 'react-native';

const initialState = {
  locations: {
    data: [],
    loading: false,
    error: false,
    errorMessage: '',
  },
  ui: {
    modal: true,
    coordinate: {
      latitude: -27.2177659,
      longitude: -49.6451598,
    },
  },
};

const loadingState = {
  locations: {
    data: [],
    loading: true,
    error: false,
    errorMessage: '',
  },
  ui: {
    modal: true,
    coordinate: {
      latitude: -27.2177659,
      longitude: -49.6451598,
    },
  },
};

const errorState = {
  locations: {
    data: [],
    loading: false,
    error: true,
    errorMessage: 'Somethig went wrong, buddy.',
  },
  ui: {
    modal: true,
    coordinate: {
      latitude: -27.2177659,
      longitude: -49.6451598,
    },
  },
};

const coordinate = {
  latitude: -27.2177659,
  longitude: -49.6451598,
};


const mockStore = configureStore([]);

describe('Testing Main Application', () => {
  const store = mockStore(initialState);

  const createWrapper = () => shallow(
    <Modal />,
    { context: { store } },
  );

  it('can render modal', () => {
    const wrapper = createWrapper();
    wrapper.dive().find(TextInput).simulate('changeText', 'lucasfernandes');
    expect(wrapper.dive().find(Button).first()).toHaveLength(1);
  });

  it('can close modal', () => {
    const wrapper = createWrapper();

    wrapper.dive().find(Button).first().simulate('press');
    expect(store.getActions()).toContainEqual(closeModal());
  });

  it('loading should works', () => {
    const newStore = mockStore(loadingState);
    const wrapper = shallow(
      <Modal />,
      { context: { store: newStore } },
    );

    expect(wrapper.dive().find(ActivityIndicator)).toHaveLength(1);
  });

  it('can add a new marker', () => {
    const wrapper = createWrapper();

    const newWrapper = wrapper.dive().setState({ login: 'lucasfernandes' });
    newWrapper.dive().find(Button).last().simulate('press');

    expect(store.getActions()).toContainEqual(addLocation('lucasfernandes', coordinate));
  });

  it('should validates login when trying to add new marker', () => {
    const wrapper = createWrapper();

    wrapper.dive().find(Button).last().simulate('press');
    expect(wrapper.dive().state('login')).toEqual('');
  });

  it('error message works properly', () => {
    const errorStore = mockStore(errorState);
    const wrapper = shallow(
      <Modal />,
      { context: { store: errorStore } },
    );


    expect(wrapper.dive().find(Text).last().children()
      .text()).toEqual(errorState.locations.errorMessage);
  });
});
