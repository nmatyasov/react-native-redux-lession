import {
  FETCHING_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERR,
  FILTER_DATA,
  SORTDIRECTION_DATA,
  FETCH_MORE_DATA,
  SELECTED_USER,
  UPDATE_USER,
  DELETE_USER,
  ADD_USER,
} from '../types';

const initialState = {
  loading: false,
  data: [],
  error: false,
  query: '',
  fullData: [],
  padding: 20,
  sortdirection: 1, //Ascending  1, Descending -1
  user: null,
  isUpdate: false,
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
        loading: false,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        fullData: action.payload.fullData,
        data: action.payload.data,
        loading: false,
        error: false,
        padding: action.payload.padding,
      };
    case FETCH_DATA_ERR:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case SORTDIRECTION_DATA:
      return {
        ...state,
        sortdirection: action.payload,
      };
    case FETCH_MORE_DATA:
      return {
        ...state,
        padding: action.payload,
      };
    case SELECTED_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
