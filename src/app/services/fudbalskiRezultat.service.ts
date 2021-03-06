import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FudbalskiRezultat} from '../model/fudbalskiRezultat';

@Injectable({
  providedIn: 'root'
})
export class FudbalskiRezultatService {

  constructor(private httpClient: HttpClient) {
  }

  getAll() {
    return this.httpClient.get<FudbalskiRezultat[]>('http://localhost:8080/fudbalski-rezultat');
  }

  getForTheDate(date: Date) {
    return this.httpClient.get<FudbalskiRezultat[]>('http://localhost:8080/fudbalski-rezultat/' + date);
  }

  getPoeniForLigaAndSezonaAndKlub(ligaId: string, sezonaId: number, klubId: string) {
    return this.httpClient.get<number>('http://localhost:8080/fudbalski-rezultat/bodovi/' + ligaId + '/' + sezonaId + '/' + klubId);
  }

  getRezultatiForKlub(ligaId: string, sezonaId: number, klubId: string) {
    return this.httpClient.get<FudbalskiRezultat[]>('http://localhost:8080/fudbalski-rezultat/' + ligaId + '/' + sezonaId + '/' + klubId);
  }
}
