import { Subject } from 'rxjs';

export const makeStoreDriver = initialState => state$ =>
  state$
  .scan((state, action) => action(state), initialState)
  .startWith(initialState)
  .map(e => {
    console.log(e); // eslint-disable-line
    return e;
  });

export const makeActionDriver = actions => () => {
  const obj = {};
  actions.forEach(action => {
    obj[action] = new Subject();
  });
  return obj;
};
