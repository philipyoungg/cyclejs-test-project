import {
  Observable,
} from 'rxjs';
import {
  h1,
} from '@cycle/dom';

const MainComponent = () => ({
  DOM: Observable.of('state')
    .map(e =>
      h1('.pv4.ph5', `Default ${e}!`)
    ),
});

export default MainComponent;
