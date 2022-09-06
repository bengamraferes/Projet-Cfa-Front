import { environment } from './../../environments/environment';
import { Epreuve } from './../_models/epreuve';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map ,throwError } from "rxjs";
import { Count } from '../_models/count';

@Injectable({ providedIn: 'root' }) //@Service , ce service va pouvoir être injecté dans les différents composants


export class EpreuveService {

    private httpHeaders = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*'
        })
      }
      constructor(private httpClient: HttpClient) {
    
      }
      getAllPage(page: number, size: number, search: string) {

        return this.httpClient.get<Epreuve[]>(`${environment.apiUrl}/epreuves/${page}/${size}/${search}`,this.httpHeaders);
      }
      getAll() {

        return this.httpClient.get<Epreuve[]>(`${environment.apiUrl}/epreuves`,this.httpHeaders);
      }
      countEpreuve(search: string) {
        return this.httpClient.get<Count>(`${environment.apiUrl}/epreuves/count/${search}`);
      }
  
    
      delete(id: number) {
        return this.httpClient.delete<void>(`${environment.apiUrl}/epreuves/${id}`,this.httpHeaders)
      }
    
      save(epreuve: Epreuve) {
        return this.httpClient.post<any>(`${environment.apiUrl}/epreuves`, epreuve, this.httpHeaders)
          .pipe(map(savedEpreuve => { return savedEpreuve }));
      }
    
      update(epreuve: Epreuve) {
        return this.httpClient.put<any>(`${environment.apiUrl}/epreuves`, epreuve, this.httpHeaders)
          .pipe(map(savedEpreuve => { return savedEpreuve }));
      }
     
}