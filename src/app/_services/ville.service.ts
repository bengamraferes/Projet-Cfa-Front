import { environment } from '../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Count } from '../_models/count';
import { Ville } from '../_models/ville';

@Injectable({ providedIn: 'root' }) //@Service , ce service va pouvoir être injecté dans les différents composants


export class VilleService {

    private httpHeaders = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*'
        })
      }
      constructor(private httpClient: HttpClient) {
    
      }
    
      getAll(page: number, size: number, search: string) {

        return this.httpClient.get<Ville[]>(`${environment.apiUrl}/villes/${page}/${size}/${search}`,this.httpHeaders);
      }
      count(search: string) {
        return this.httpClient.get<any>(`${environment.apiUrl}/villes/count/${search}`,this.httpHeaders);
      }
      updateDg2() {
        return this.httpClient.get<Count>(`${environment.apiUrl}/villes/dg2`,this.httpHeaders);
      }
}
