import {
  div,
  button,
} from '@cycle/dom';
import UserList from './UserList';

const UserContainer = (users) =>
  div('.pv4.ph5', [
    button('.refresh-ajax.pa3.mb4', 'refresh new user'),
    UserList(users), // eslint-disable-line
  ]);

export default UserContainer;
