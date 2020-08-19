import {Zemlja} from './zemlja';
import {Trener} from './trener';
import {Liga} from './liga';

export class FudbalskiKlub {
  id: string;
  naziv: string;
  zemlja: Zemlja;
  trener: Trener;
  liga: Liga;
}
