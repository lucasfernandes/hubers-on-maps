import { takeLatest } from 'redux-saga/effects';

import { Types as LocationsTypes } from 'redux/ducks/locations';

import { searchAndAddUser } from 'redux/sagas/locations';

export default function* root() {
  yield [
    takeLatest(LocationsTypes.REQUEST, searchAndAddUser),
  ];
}
