import { Observable } from 'rxjs';
import { run } from '@cycle/rxjs-run';
import { makeDOMDriver, button, div, hr } from '@cycle/dom';
import UserComponent from './user/UserComponent';
import MainComponent from './main/MainComponent';

const main = (sources) => {
  const userMenu = sources.DOM
    .select('.userMenu')
    .events('click')
    .mapTo(UserComponent);

  const mainMenu = sources.DOM
    .select('.mainMenu')
    .events('click')
    .mapTo(MainComponent);

  const state = Observable.merge(userMenu, mainMenu)
    .startWith(MainComponent)
    .flatMap(comp => comp(sources).DOM);

  const view = state
    .map(children =>
      div('.pv4.ph5', [
        button('.mainMenu.dib.pa3', 'index'),
        button('.userMenu.dib.pa3', 'user'),
        hr(),
        children,
      ])
    );

  return {
    DOM: view,
  };
};

const drivers = {
  DOM: makeDOMDriver('#app'),
};

run(main, drivers);
