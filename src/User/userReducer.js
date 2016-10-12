import R from 'ramda';

export const initReducer = initState => state =>
R.assoc('users', initState)(state);

export const deleteReducer = actionId => state =>
  R.evolve({
    users: R.reject(R.propEq('id', actionId)),
  })(state);

export const toggleReducer = bool => state => //eslint-disable-line
  R.evolve({
    filter: R.not,
  })(state);
