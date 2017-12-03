
// Action Types

import { Types as UITypes } from 'redux/ducks/ui';

export const Types = {
  PREPARE: 'locations/PREPARE',
  REQUEST: 'locations/REQUEST',
  SUCCESS: 'locations/SUCCESS',
  ERROR: 'locations/ERROR',
  DUPLICATED: 'locations/DUPLICATED',
  REMOVE: 'locations/REMOVE',
};

// Reducers

const initialState = {
  data: [],
  loading: false,
  error: false,
  errorMessage: '',
};

export default function locations(state = initialState, action) {
  switch (action.type) {
    case UITypes.OPEN:
    case Types.PREPARE:
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: '',
      };
    case Types.REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case Types.SUCCESS:
      return {
        data: [...state.data, action.payload.location],
        loading: false,
        error: false,
        modal: false,
        errorMessage: '',
      };
    case Types.ERROR:
      return {
        data: [...state.data],
        loading: false,
        error: true,
        modal: true,
        errorMessage: 'Usuário não encontrado',
      };
    case Types.DUPLICATED:
      return {
        ...state,
        loading: false,
        error: true,
        modal: true,
        errorMessage: 'Usuário já existe',
      };
    case Types.REMOVE:
      return {
        data: state.data.filter(marker => marker.user.id !== action.payload.marker.user.id),
      };
    default:
      return state;
  }
}


// Actions Creators

export function addLocation(login, coordinate) {
  return {
    type: Types.REQUEST,
    payload: {
      login,
      coordinate,
    },
  };
}

export function removeMarker(marker) {
  return {
    type: Types.REMOVE,
    payload: {
      marker,
    },
  };
}
