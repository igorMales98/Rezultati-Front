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
}
