import { Observable, Subject } from 'rxjs';
import { run } from '@cycle/rxjs-run';
import { makeDOMDriver, button, div, p } from '@cycle/dom';
import fetch from 'universal-fetch';

import UserList from './User/UserList';
import { initUser, deleteUser, toggleFilter } from './User/userReducer';

const main = ({ DOM, store }) => {
  const toggleFilter$ = DOM.select('.toggle-filter').events('click')
    .mapTo('toggle click')
    .map(toggleFilter);

  const deleteUser$ = DOM.select('.delete-user').events('click')
    .map(e => e.currentTarget.getAttribute('key'))
    .map(Number)
    .map(deleteUser);

  const requestClick$ = DOM.select('.refresh-user').events('click')
    .startWith('init click')
    .mapTo('https://jsonplaceholder.typicode.com/users/')
    .flatMap(URL => Observable.fromPromise(fetch(URL)))
    .flatMap(x => x.json())
    .map(initUser);

  const state$ = Observable.merge(deleteUser$, toggleFilter$, requestClick$);

  const vDOM$ = store.map(data =>
      div('.pv4.ph5', [
        button('.toggle-filter.pa3.mb4', 'toggle filter'),
        button('.refresh-user.pa3.mb4', 'refresh new user'),
        data.users.length > 0 ? UserList(data.users) : p('Loading...'), // eslint-disable-line
      ])
    );

  const sinks = {
    DOM: vDOM$,
    store: state$,
  };
  return sinks;
};

const makeStoreDriver = initialState => state$ =>
  state$
  .scan((state, action) => action(state), initialState)
  .startWith(initialState)
  .map(e => {
    console.log(e);
    return e;
  });

const makeActionDriver = actions => () => {
  const obj = {};
  actions.forEach(action => {
    obj[action] = new Subject();
  });
  return obj;
};

const drivers = {
  DOM: makeDOMDriver('#app'),
  store: makeStoreDriver({ filter: false, users: [] }),
  actions: makeActionDriver([
    'TOGGLE_FILTER',
    'DELETE_USER',
  ]),
};

run(main, drivers);
