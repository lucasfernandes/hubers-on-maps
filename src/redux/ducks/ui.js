
// Action Types

import { Types as LocationsTypes } from 'redux/ducks/locations';

export const Types = {
  OPEN: 'ui/OPEN',
  CLOSE: 'ui/CLOSE',
  SUCCESS: 'locations/SUCCESS',
};


// Reducers

const initialState = { modal: false };

export default function modal(state = initialState, action) {
  switch (action.type) {
    case Types.OPEN:
      return {
        ...state,
        coordinate: action.payload.coordinate,
        modal: true,
      };
    case LocationsTypes.SUCCESS:
    case Types.CLOSE:
      return {
        ...state,
        modal: false,
      };
    default:
      return state;
  }
}


// Actions Creators

export function openModal(coordinate) {
  return {
    type: Types.OPEN,
    payload: {
      coordinate,
    },
  };
}

export function closeModal() {
  return {
    type: Types.CLOSE,
  };
}
