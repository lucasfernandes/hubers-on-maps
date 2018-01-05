import React from 'react';

import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { closeModal } from 'redux/ducks/ui';

import Modal from 'pages/Main/components/Modal';
import Button from 'pages/Main/components/Button';

import { Platform, TouchableWithoutFeedback, TextInput } from 'react-native';

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
    modal: true,
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

  it.skip('can add a new marker', () => {
    const wrapper = createWrapper();

    wrapper.dive().setState({ login: 'lucasfernandes' });
    wrapper.dive().find(Button).last().simulate('press');
    // expect(store.getActions()).toContainEqual(closeModal());
  });
});
