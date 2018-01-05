import reducer, { Types as TYPES } from 'redux/ducks/ui';
import { Types as LOCATION_TYPES } from 'redux/ducks/locations';

const initialState = {
  modal: false,
  coordinate: {
    latitude: -27.21674038370849,
    longitude: -49.64500273331678,
  },
};


describe('Testing UI Reducer', () => {
  it('can return default state', () => {
    const nakedState = { modal: false };
    const state = reducer(undefined, {});

    expect(state.modal).toBe(nakedState.modal);
  });

  it('can open modal', () => {
    const state = reducer(initialState, { type: TYPES.OPEN, payload: initialState.coordinate });

    expect(state.modal).toBe(true);
  });

  it('can close modal', () => {
    const newState = { ...initialState, modal: true };
    const state = reducer(newState, { type: TYPES.CLOSE });
    const state2 = reducer(newState, { type: LOCATION_TYPES.SUCCESS });

    expect(state.modal).toBe(false);
    expect(state2.modal).toBe(false);
  });
});
