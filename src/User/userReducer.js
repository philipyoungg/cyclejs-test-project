import R from 'ramda';

export const initUser = initState => state => // eslint-disable-line
    initState;

export const deleteUser = actionId => state =>
    R.reject(R.propEq('id', actionId))(state);
