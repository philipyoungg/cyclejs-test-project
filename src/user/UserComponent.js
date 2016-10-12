import { Observable } from 'rxjs';
import { div, h1, button } from '@cycle/dom';
import fetch from 'universal-fetch';
import { toggleReducer, deleteReducer, initReducer } from './userReducer';
import userList from './userList';

const UserComponent = ({ DOM }) => {
  const toggleFilter = DOM
    .select('.toggle-filter')
    .events('click')
    .mapTo('toggle click')
    .map(toggleReducer);

  const deleteUser = DOM
    .select('.delete-user')
    .events('click')
    .map(e => e.target.getAttribute('key'))
    .map(Number)
    .map(deleteReducer);

  const requestClick = DOM.select('.refresh-user').events('click')
    .startWith('init click')
    .mapTo('https://jsonplaceholder.typicode.com/users/')
    .flatMap(URL => Observable.fromPromise(fetch(URL)))
    .flatMap(x => x.json())
    .map(initReducer);

  const initialState = { users: [], filter: true };

  const state = Observable.merge(deleteUser, toggleFilter, requestClick)
    .scan((acc, x) => x(acc), initialState)
    .startWith(initialState);

  const view = state.map(data =>
    div('.pv4.ph5', [
      h1(`Filter: ${String(data.filter)}`),
      button('.toggle-filter.pa3.mb4', 'toggle filter'),
      button('.refresh-user.pa3.mb4', 'refresh new user'),
      userList(data.users),
    ])
  );

  return {
    DOM: view,
  };
};

export default UserComponent;
