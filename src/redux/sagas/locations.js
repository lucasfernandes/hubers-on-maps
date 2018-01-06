import api from 'services/api';

import { Types as LocationsTypes } from 'redux/ducks/locations';

import { call, put, select } from 'redux-saga/effects';

const locations = state => state.locations;

export function* searchAndAddUser(action) {
  const { coordinate } = action.payload;
  const response = yield call(api.get, `users/${action.payload.login}`);

  if (response.ok) {
    let duplicated = false;
    const locationsState = yield select(locations);

    if (locationsState) {
      duplicated = locationsState.data.some(data => data.user.id === response.data.id);
    }

    yield put({
      type: duplicated ? LocationsTypes.DUPLICATED : LocationsTypes.SUCCESS,
      payload: { location: { user: response.data, marker: coordinate } },
    });
  } else {
    yield put({ type: LocationsTypes.ERROR });
  }
}
