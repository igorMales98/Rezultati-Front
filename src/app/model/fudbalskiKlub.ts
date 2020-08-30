import {Zemlja} from './zemlja';
import {Trener} from './trener';
import {Liga} from './liga';
import {Fudbaler} from './fudbaler';

export class FudbalskiKlub {
  id: string;
  naziv: string;
  zemlja: Zemlja;
  trener: Trener;
  liga: Liga;
  fudbaleri: Fudbaler[] = [];

  // pomocna polja
  bodovi: number;
}
