import {
  ul,
  p,
} from '@cycle/dom';
import User from './User';

const UserList = users => // eslint-disable-line
  users.length > 0 ?
  ul(users.map(User)) :
  p('.f3', 'Loading...');

export default UserList;
