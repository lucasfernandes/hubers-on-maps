import React from 'react';

import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { removeMarker } from 'redux/ducks/locations';

import { Platform, TouchableWithoutFeedback } from 'react-native';

import MapView from 'react-native-maps';
import Main from 'pages/Main';
import Modal from 'pages/Main/components/Modal';

const initialState = {
  locations: {
    data: [],
    loading: false,
    error: false,
    errorMessage: '',
  },
  ui: {
    modal: false,
  },
};

const stateWithMarkers = {
  ui: {
    modal: false,
    coordinate: {
      latitude: -27.21674038370849,
      longitude: -49.64500273331678,
    },
  },
  locations: {
    data: [
      {
        user: {
          login: 'lucasfernandes',
          id: 29531,
          avatar_url: 'https://avatars2.githubusercontent.com/u/29531?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/lucasfernandes',
          html_url: 'https://github.com/lucasfernandes',
          followers_url: 'https://api.github.com/users/lucasfernandes/followers',
          following_url: 'https://api.github.com/users/lucasfernandes/following{/other_user}',
          gists_url: 'https://api.github.com/users/lucasfernandes/gists{/gist_id}',
          starred_url: 'https://api.github.com/users/lucasfernandes/starred{/owner}{/repo}',
          subscriptions_url: 'https://api.github.com/users/lucasfernandes/subscriptions',
          organizations_url: 'https://api.github.com/users/lucasfernandes/orgs',
          repos_url: 'https://api.github.com/users/lucasfernandes/repos',
          events_url: 'https://api.github.com/users/lucasfernandes/events{/privacy}',
          received_events_url: 'https://api.github.com/users/lucasfernandes/received_events',
          type: 'User',
          site_admin: false,
          name: 'Lucas Fernandes',
          company: 'ADTSys',
          blog: 'http://www.adtsys.com.br/',
          location: 'Campinas, SP',
          email: null,
          hireable: true,
          bio: '7+ years as software engineer, 4+ years as Agile Coach / Scrum Master, now focused in mobile development with React Native for iOS and Android platforms.',
          public_repos: 18,
          public_gists: 2,
          followers: 23,
          following: 42,
          created_at: '2008-10-17T18:57:44Z',
          updated_at: '2017-12-22T13:52:11Z',
        },
        marker: {
          latitude: -27.21674038370849,
          longitude: -49.64500273331678,
        },
      },
    ],
    loading: false,
    error: false,
    errorMessage: '',
    modal: false,
  },
  openModal: 'fn()',
  removeMarker: 'fn()',
};

const e = {
  nativeEvent: {
    coordinate: {
      latitude: -27.2177659,
      longitude: -49.6451598,
    },
  },
};

const mockStore = configureStore([]);

describe('Testing Main Application', () => {
  const store = mockStore(initialState);

  const createWrapper = () => shallow(
    <Main />,
    { context: { store } },
  );

  const createModalWrapper = () => shallow(
    <Modal />,
    { context: { store } },
  );

  it('show render with initial states', () => {
    const wrapper = createWrapper();

    expect(wrapper.dive().find(MapView)).toHaveLength(1);
  });

  it('show markers on map', () => {
    const store2 = mockStore(stateWithMarkers);
    const wrapper = shallow(
      <Main />,
      { context: { store: store2 } },
    );

    expect(wrapper.dive().find(MapView)).toHaveLength(1);

    expect(wrapper.dive().find(MapView).find(MapView.Marker)).toHaveLength(1);
  });

  it('show markers on android map', () => {
    Platform.OS = 'android';

    const store2 = mockStore(stateWithMarkers);
    const wrapper = shallow(
      <Main />,
      { context: { store: store2 } },
    );

    expect(wrapper.dive().find(MapView)).toHaveLength(1);

    expect(wrapper.dive().find(MapView).find(MapView.Marker)).toHaveLength(1);
  });

  it('can see marker details', () => {
    const store2 = mockStore(stateWithMarkers);
    const wrapper = shallow(
      <Main />,
      { context: { store: store2 } },
    );

    expect(wrapper.dive().find(MapView).find(MapView.Marker).find(MapView.Callout)).toHaveLength(1);
  });

  it('can see marker details on Android', () => {
    Platform.OS = 'android';

    const store2 = mockStore(stateWithMarkers);
    const wrapper = shallow(
      <Main />,
      { context: { store: store2 } },
    );

    expect(wrapper.dive().find(MapView).find(MapView.Marker).find(MapView.Callout)).toHaveLength(1);
  });

  it('can remove a marker', () => {
    Platform.OS = 'ios';
    const store2 = mockStore(stateWithMarkers);
    const wrapper = shallow(
      <Main />,
      { context: { store: store2 } },
    );

    const mapDetail = wrapper.dive().find(MapView).find(MapView.Marker).find(MapView.Callout);
    mapDetail.find(TouchableWithoutFeedback).simulate('press');

    expect(store2.getActions()).toContainEqual(removeMarker(stateWithMarkers.locations.data[0]));
  });

  it('can remove a marker on android', () => {
    Platform.OS = 'android';
    const store2 = mockStore(stateWithMarkers);
    const wrapper = shallow(
      <Main />,
      { context: { store: store2 } },
    );

    const mapDetail = wrapper.dive().find(MapView).find(MapView.Marker).find(MapView.Callout);
    mapDetail.simulate('press');

    expect(store2.getActions()).toContainEqual(removeMarker(stateWithMarkers.locations.data[0]));
  });

  it('can open modal when long press the map', () => {
    const wrapper = createWrapper();
    const modalWrapper = createModalWrapper();

    wrapper.dive().find(MapView).simulate('longPress', e);

    expect(wrapper.dive().last().children().last()
      .dive()
      .prop('data')).toEqual(modalWrapper.prop('data'));
  });
});
