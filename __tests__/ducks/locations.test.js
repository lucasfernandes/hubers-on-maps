import reducer, { Types as TYPES, removeMarker } from 'redux/ducks/locations';
import { Types as UITypes } from 'redux/ducks/ui';

const initialState = {
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
};

describe('Testing Locations Reducer', () => {
  it('can return default state', () => {
    const defaultState = { ...initialState, data: [] };
    const state = reducer(undefined, {});

    expect(state).toEqual(defaultState);
  });

  it('can prepare location', () => {
    const state = reducer(initialState, { type: TYPES.PREPARE });
    const state2 = reducer(initialState, { type: UITypes.OPEN });

    expect(state).toEqual(initialState);
    expect(state2).toEqual(initialState);
  });

  it('can request location', () => {
    const state = reducer(initialState.data[0], { type: TYPES.REQUEST });

    expect(state.loading).toBe(true);
  });

  it('can successfully add a location', () => {
    const state = reducer(initialState, { type: TYPES.SUCCESS, payload: initialState.data[0] });

    expect(state.data).toHaveLength(2);
  });

  it('can receive errors when try to add a location', () => {
    const errorState = { ...initialState, error: true, errorMessage: 'Usuário não encontrado' };
    const state = reducer(errorState, { type: TYPES.ERROR });

    expect(state.error).toBe(true);
    expect(state.errorMessage).toEqual(errorState.errorMessage);
  });

  it('can return error when location is duplicated', () => {
    const duplicatedState = { ...initialState, error: true, errorMessage: 'Usuário já existe' };
    const state = reducer(
      duplicatedState,
      { type: TYPES.DUPLICATED, payload: duplicatedState.data[0] },
    );

    expect(state.error).toBe(true);
    expect(state.errorMessage).toEqual(duplicatedState.errorMessage);
  });

  it('can remove a marker', () => {
    const state = reducer(initialState, removeMarker(initialState.data[0]));

    expect(state.data).toHaveLength(0);
  });
});
