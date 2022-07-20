import { environment } from './../../environments/environment';
import { Formation } from './../_models/formation';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map ,throwError } from "rxjs";
import { Count } from '../_models/count';

@Injectable({ providedIn: 'root' }) //@Service , ce service va pouvoir être injecté dans les différents composants


export class FormationService {

    private httpHeaders = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*'
        })
      }
      constructor(private httpClient: HttpClient) {
    
      }
      getAllPage(page: number, size: number, search: string) {

        return this.httpClient.get<Formation[]>(`${environment.apiUrl}/formations/${page}/${size}/${search}`,this.httpHeaders);
      }
      getAll() {
        return this.httpClient.get<Formation[]>(`${environment.apiUrl}/formations`,this.httpHeaders);
      }
      count(search: string) {
        return this.httpClient.get<any>(`${environment.apiUrl}/formations/count/${search}`);
      }
      updateDg2() {
        return this.httpClient.get<Count>(`${environment.apiUrl}/formations/dg2`,this.httpHeaders);
      }
}
