import {
  li,
  h1,
  p,
  span,
} from '@cycle/dom';

export default ({ id, name, email }) =>
  li('.mb5', { key: id }, [
    h1('.mb0', name),
    p('.mt2.mb4.black-60', email),
    span('.delete-user.pointer.ba.pa2.hover-bg-black.hover-white.bg-animate',
    { attrs: { key: id } }, 'remove user'),
  ]);
