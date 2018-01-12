import SagaTester from 'redux-saga-tester';
import MockAdapter from 'axios-mock-adapter';

import api from 'services/api';
import rootSaga from 'redux/sagas';
import reducer, { Types as TYPES, addLocation } from 'redux/ducks/locations';

const userFixture = require('./fixtures/user.json');
const coordinateFixture = require('./fixtures/coordinate.json');

const duplicatedState = {
  data: [
    {
      user: userFixture['users/lucasfernandes'],
      marker: coordinateFixture['coordinate/lucasfernandes'],
    },
  ],
  loading: false,
  error: true,
  errorMessage: 'Usuário já existe',
};

describe('Testing Locations SAGA', () => {
  let sagaTester = null;
  let apiMock = null;

  beforeEach(() => {
    sagaTester = new SagaTester({});
    apiMock = new MockAdapter(api.axiosInstance);

    sagaTester.start(rootSaga);
  });

  it('can request user data', async () => {
    apiMock.onGet('/users/lucasfernandes')
      .reply(200, userFixture['users/lucasfernandes']);

    sagaTester.dispatch(addLocation('lucasfernandes', coordinateFixture['coordinate/lucasfernandes']));

    await sagaTester.waitFor(TYPES.REQUEST);

    expect(sagaTester.getLatestCalledAction()).toEqual({
      type: TYPES.SUCCESS,
      payload: {
        location: {
          user: userFixture['users/lucasfernandes'],
          marker: coordinateFixture['coordinate/lucasfernandes'],
        },
      },
    });
  });

  it('throws duplication error when user already exists', async () => {
    apiMock.onGet('/users/lucasfernandes')
      .reply(200, userFixture['users/lucasfernandes']);

    const dupSagaTester = new SagaTester({
      initialState: { locations: duplicatedState },
    });

    dupSagaTester.start(rootSaga);

    dupSagaTester.dispatch(addLocation('lucasfernandes', coordinateFixture['coordinate/lucasfernandes']));

    await dupSagaTester.waitFor(TYPES.DUPLICATED);
  });

  it('throws error when user doesnt exists', async () => {
    apiMock.onGet('/users/fail')
      .reply(400);

    sagaTester.dispatch(addLocation('failfailfail', coordinateFixture['coordinate/lucasfernandes']));

    await sagaTester.waitFor(TYPES.ERROR);

    expect(sagaTester.getLatestCalledAction())
      .toEqual({ type: 'locations/ERROR' });
  });
});
