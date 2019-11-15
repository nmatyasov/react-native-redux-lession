import {
  FETCHING_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERR,
  FILTER_DATA,
} from '../types';

const initialState = {
  loading: false,
  data: [],
  error: false,
  query: '',
  fullData: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
        loading: true,
      };
    case FILTER_DATA:
      return {
        ...state,
        data: action.payload.data,
        query: action.payload.query,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        fullData: action.payload,
        data: action.payload,
        loading: false,
      };
    case FETCH_DATA_ERR:
      return {
        ...state,
        error: true,
        loading: false,
      };
    default:
      return state;
  }
};
