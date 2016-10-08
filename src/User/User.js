import {
  li,
  h1,
  p,
  span,
} from '@cycle/dom';

const User = ({ id, name, email }) =>
  li('.mb5', [
    h1('.mb0', name),
    p('.mt2.mb4.black-60', email),
    span('.remove-user.pointer.ba.pa2.hover-bg-black.hover-white.bg-animate', { attrs: { key: id } }, 'remove user'),
  ]);

export default User;
