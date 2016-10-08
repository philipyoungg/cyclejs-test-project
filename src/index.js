import xs from 'xstream';
import { run } from '@cycle/xstream-run';
import { makeDOMDriver } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';

import foldApply from './helper/foldApply';
import UserContainer from './User/UserContainer';
import { initUser, deleteUser } from './User/userReducer';

const main = (sources) => {
  const userAJAX = {
    url: 'https://jsonplaceholder.typicode.com/users/',
    category: 'user',
  };

  const request$ = sources.DOM.select('.refresh-ajax').events('click')
    .mapTo(userAJAX)
    .startWith(userAJAX);

  const deleteUser$ = sources.DOM.select('.remove-user').events('click')
    .map(e => e.currentTarget.getAttribute('key'))
    .map(Number)
    .map(deleteUser);

  const initUser$ = sources.HTTP
    .select('user')
    .flatten()
    .map(res => res.body)
    .map(initUser);

  const state$ = xs.merge(deleteUser$, initUser$)
    .fold(foldApply, [])
    .startWith([]);

  const vdom$ = state$
    .map(UserContainer);

  const sinks = {
    DOM: vdom$,
    HTTP: request$,
  };
  return sinks;
};

const drivers = {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver(),
};

run(main, drivers);
