// Action Types
import { Types as UITypes } from 'redux/ducks/ui';

export const Types = {
  PREPARE: 'locations/PREPARE',
  REQUEST: 'locations/REQUEST',
  SUCCESS: 'locations/SUCCESS',
  ERROR: 'locations/ERROR',
  DUPLICATED: 'locations/DUPLICATED',
};

// Reducers

const initialState = { data: [], error: false, loading: false };

export default function locations(state = initialState, action) {
  switch (action.type) {
    case UITypes.CLOSE:
    case Types.PREPARE:
      return {
        data: [...state.data],
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
        errorMessage: 'Não encontrei este GitHuber, =(',
      };
    case Types.DUPLICATED:
      return {
        ...state,
        loading: false,
        error: true,
        modal: true,
        errorMessage: 'Este GitHuber já foi adicionado antes...',
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
