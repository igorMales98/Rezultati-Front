import DateTimeFormat = Intl.DateTimeFormat;
import {Zemlja} from './zemlja';
import {Sport} from './sport';

export class Trener {
  id: string;
  ime: string;
  prezime: string;
  godinjaRodjenja: Date;
  zemlja: Zemlja;
  sport: Sport;
}
