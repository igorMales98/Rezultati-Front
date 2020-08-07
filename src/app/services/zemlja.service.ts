import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Zemlja} from '../model/zemlja';

@Injectable({
  providedIn: 'root'
})
export class ZemljaService {

  constructor(private httpClient: HttpClient) {
  }

  getAll() {
    return this.httpClient.get<Zemlja[]>('http://localhost:8080/zemlja');
  }
}
