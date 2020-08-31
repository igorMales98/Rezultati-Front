import {Fudbaler} from './fudbaler';

export class Informacija {
  id: string;
  strelci: Fudbaler[] = [];
  posedDomacin: number;
  posedGost: number;
  suteviDomacin: number;
  suteviGost: number;
  brojZutihKartonaDomacin: number;
  brojZutihKartonaGost: number;
  brojCrvenihKartonaDomacin: number;
  brojCrvenihKartonaGost: number;
}
