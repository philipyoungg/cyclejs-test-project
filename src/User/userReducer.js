import R from 'ramda';

export const initUser = initState => state =>
R.assoc('users', initState)(state);

export const deleteUser = actionId => state =>
  R.evolve({
    users: R.reject(R.propEq('id', actionId)),
  })(state);

export const toggleFilter = bool => state =>
  R.evolve({
    filter: R.not,
  })(state);
