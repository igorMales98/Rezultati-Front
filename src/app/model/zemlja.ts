import {Liga} from './liga';

export class Zemlja {
  id: string;
  naziv: string;
  lige: Liga[] = [];

  // pomocni atributi
  prikazaneLige: boolean;
}
