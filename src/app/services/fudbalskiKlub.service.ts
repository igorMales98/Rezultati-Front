import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Liga} from '../model/liga';
import {FudbalskiKlub} from '../model/fudbalskiKlub';

@Injectable({
  providedIn: 'root'
})
export class FudbalskiKlubService {

  constructor(private httpClient: HttpClient) {
  }

  getKluboviFromLigaAndSezona(liga: Liga, sezona: number) {
    return this.httpClient.get<FudbalskiKlub[]>('http://localhost:8080/fudbalski-klub/' + liga.id + '/' + sezona);
  }

}
