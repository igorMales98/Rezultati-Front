import {FudbalskiKlub} from './fudbalskiKlub';
import {Liga} from './liga';
import {Sezona} from './sezona';
import {Zemlja} from './zemlja';
import {Informacija} from './informacija';

export class FudbalskiRezultat {
  id: string;
  vremeOdrzavanjaUtakmice: Date;
  domacin: FudbalskiKlub;
  gost: FudbalskiKlub;
  liga: Liga;
  sezona: Sezona;
  goloviDomacin: number;
  goloviGost: number;
  informacija: Informacija;

  // pomocna polja
  zemlja: Zemlja;
}
