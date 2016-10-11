import { Observable } from 'rxjs';
import { run } from '@cycle/rxjs-run';
import { makeDOMDriver, button, div, p, h1, hr } from '@cycle/dom';
import fetch from 'universal-fetch';
import R from 'ramda';
import UserList from './User/UserList';

const mainComponent = () => ({
  DOM: Observable.of('state')
    .map(e =>
    h1(`default ${e}!`)
  ),
});

const userComponent = ({ DOM }) => {
  const initialState = { users: [], filter: true };

  const toggleFilter = DOM.select('.toggle-filter').events('click')
    .mapTo('toggle click')
    .map(bool => state => //eslint-disable-line
      R.evolve({
        filter: R.not,
      })(state));

  const deleteUser = DOM.select('.delete-user').events('click')
    .map(e => e.target.getAttribute('key'))
    .map(Number)
    .do(console.log)
    .map(actionId => state =>
      R.evolve({
        users: R.reject(R.propEq('id', actionId)),
      })(state));

  const requestClick = DOM.select('.refresh-user').events('click')
    .startWith('init click')
    .mapTo('https://jsonplaceholder.typicode.com/users/')
    .flatMap(URL => Observable.fromPromise(fetch(URL)))
    .flatMap(x => x.json())
    .map(initState => state => R.assoc('users', initState)(state));

  const state = Observable.merge(deleteUser, toggleFilter, requestClick)
    .scan((acc, x) => x(acc), initialState)
    .startWith(initialState)
    .do(console.log);

  const view = state.map(data =>
      div('.pv4.ph5', [
        h1(`Filter: ${String(data.filter)}`),
        button('.toggle-filter.pa3.mb4', 'toggle filter'),
        button('.refresh-user.pa3.mb4', 'refresh new user'),
        data.users.length > 0 ? UserList(data.users) : p('Loading...'), // eslint-disable-line
      ])
    );

  const sinks = {
    DOM: view,
  };
  return sinks;
};

const main = (sources) => {
  const userMenu = sources.DOM.select('.userMenu').events('click')
    .mapTo(userComponent);

  const mainMenu = sources.DOM.select('.mainMenu').events('click')
    .mapTo(mainComponent);

  const state = Observable.merge(userMenu, mainMenu)
    .startWith(mainComponent)
    .flatMap(comp => comp(sources).DOM);

  const view = state
    .map(children =>
      div('.pv4.ph5', [
        p('.mainMenu.dib.mr4', 'index'),
        p('.userMenu.dib', 'user'),
        hr(),
        children,
      ])
    );

  const sinks = {
    DOM: view,
  };
  return sinks;
};

const drivers = {
  DOM: makeDOMDriver('#app'),
};

run(main, drivers);
