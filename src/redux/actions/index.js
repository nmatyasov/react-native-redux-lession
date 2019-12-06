import {
  FETCHING_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERR,
  FILTER_DATA,
  SORTDIRECTION_DATA,
  SELECTED_USER,
  UPDATE_USER,
  DELETE_USER,
  ADD_USER,
} from '../types';
import _ from 'lodash';

import {getUsers, contains, makeSectionList} from '../../Api';

//future functional
// export const debounceMakeRemoteRequest = _.debounce(
//   val => makeRemoteRequest(val),
//   250,
// );

export const makeRemoteRequest = (padding = 20, val = '') => {
  return function(dispatch) {
    dispatch(getRequest());
    getUsers(padding, val)
      .then(users => {
        //sort array by section
        const secData = makeSectionList(users);
        dispatch(getRequestSuccess(secData, users, padding));
      })
      .catch(error => {
        dispatch(getRequestFailure());
      });
  };
};
//start fetching data
function getRequest() {
  return {
    type: FETCHING_DATA,
  };
}

//Success fetch data
function getRequestSuccess(data, users, padding) {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: {data: data, fullData: users, padding: padding},
  };
}

//Failure request
function getRequestFailure() {
  return {
    type: FETCH_DATA_ERR,
  };
}

export const handleSearch = (val, fullData) => {
  return function(dispatch) {
    dispatch(getRequest());
    const formatQuery = val.toLowerCase();

    const data = _.filter(fullData, user => {
      return contains(user, formatQuery);
    });
    //sort array by section
    const secData = makeSectionList(data);

    dispatch(getDataFiltered(val, secData));
  };
};

export const handleSortDirection = val => {
  return function(dispatch) {
    dispatch(getDataSorted(val === 1 ? -1 : 1));
  };
};

function getDataFiltered(text, data) {
  return {
    type: FILTER_DATA,
    payload: {data: data, query: text},
  };
}

function getDataSorted(val) {
  return {
    type: SORTDIRECTION_DATA,
    payload: val,
  };
}

export const handleSelectUser = user => {
  return {
    type: SELECTED_USER,
    payload: user,
  };
};
