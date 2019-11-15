import {
  FETCHING_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERR,
  FILTER_DATA,
} from '../types';
import _ from 'lodash';

import {getUsers, contains} from '../../Api';

export function makeRemoteRequest(val) {
  return function(dispatch) {
    dispatch(getRequest());
    getUsers(20, val)
      .then(users => {
        dispatch(getRequestSuccess(users));
      })
      .catch(error => {
        dispatch(getRequestFailure());
      });
  };
}
//start fetching data
function getRequest() {
  return {
    type: FETCHING_DATA,
  };
}

//Success fetch data
function getRequestSuccess(data) {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: data,
  };
}

//Failure request
function getRequestFailure() {
  return {
    type: FETCH_DATA_ERR,
  };
}

export function handleSearch(val, fullData) {
  return function(dispatch) {
    const formatQuery = val.toLowerCase();

    const data = _.filter(fullData, user => {
      return contains(user, formatQuery);
    });

    dispatch(getDataFiltered(val, data));
  };
}

function getDataFiltered(text, data) {
  return {
    type: FILTER_DATA,
    payload: {data: data, query: text},
  };
}
