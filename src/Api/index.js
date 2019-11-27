import _ from 'lodash';
import users from './users';

export const contains = ({name, email}, query) => {
  const {first, last} = name;
  if (first.includes(query) || last.includes(query) || email.includes(query)) {
    return true;
  }
  return false;
};

export const makeSectionList = data => {
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
  return arr;
};

export const getUsers = (limit, query = '') => {
  return new Promise((resolve, reject) => {
    if (query.length === 0) {
      if (limit > 0) {
        resolve(_.take(users, limit));
      } else {
        resolve(users);
      }
    } else {
      const formattedQuery = query.toLowerCase();
      const results = _.filter(users, user => {
        return contains(user, formattedQuery);
      });
      if (limit > 0) {
        resolve(_.take(results, limit));
      } else {
        resolve(results);
      }
    }
  });
};

export default getUsers;
