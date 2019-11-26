import {
  FETCHING_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERR,
  FILTER_DATA,
} from '../types';
import _ from 'lodash';

import {getUsers, contains, makeSortSectionList} from '../../Api';

export function makeRemoteRequest(val) {
  return function(dispatch) {
    dispatch(getRequest());
    getUsers(20, val)
      .then(users => {
        //sort array by section
        const sordedData = makeSortSectionList(users);
        dispatch(getRequestSuccess(sordedData, users));
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
function getRequestSuccess(data, users) {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: {data: data, fullData: users},
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
    dispatch(getRequest());
    const formatQuery = val.toLowerCase();

    const data = _.filter(fullData, user => {
      return contains(user, formatQuery);
    });
    //sort array by section
    const sordedData = makeSortSectionList(data);

    dispatch(getDataFiltered(val, sordedData));
  };
}

function getDataFiltered(text, data) {
  return {
    type: FILTER_DATA,
    payload: {data: data, query: text},
  };
}
