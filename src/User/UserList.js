import {
  ul,
  p,
} from '@cycle/dom';
import user from './user';

export default (users) => // eslint-disable-line
  users.length > 0 ?
  ul(users.map(user)) :
  p('.f3', 'Loading...');
