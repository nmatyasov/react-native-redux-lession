import _ from 'lodash';
import users from './users';

export const contains = ({name, email}, query) => {
  const {first, last} = name;
  if (first.includes(query) || last.includes(query) || email.includes(query)) {
    return true;
  }
  return false;
};

export const makeSortSectionList = data => {
  var arr = [];
  for (var i = 0; i < Object.keys(data).length; i++) {
    //iterate
    var o = data[Object.keys(data)[i]];
    var anyString = o.name.first;
    let existObj = arr.find(
      obj => obj.title === anyString.charAt(0).toUpperCase(),
    );
    if (existObj) {
      existObj.data.push(o);
    } else {
      arr.push({
        title: anyString.charAt(0).toUpperCase(),
        data: [o],
      });
    }
  }
  arr.sort(function(a, b) {
    var nameA = a.title.toLowerCase();
    var nameB = b.title.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return arr;
};

export const getUsers = (limit = 20, query = '') => {
  return new Promise((resolve, reject) => {
    if (query.length === 0) {
      resolve(_.take(users, limit));
    } else {
      const formattedQuery = query.toLowerCase();
      const results = _.filter(users, user => {
        return contains(user, formattedQuery);
      });
      resolve(_.take(results, limit));
    }
  });
};

export default getUsers;
