import { environment } from './../../environments/environment';
import { Niveau } from './../_models/niveau';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map ,throwError } from "rxjs";
import { Count } from '../_models/count';

@Injectable({ providedIn: 'root' }) //@Service , ce service va pouvoir être injecté dans les différents composants


export class NiveauService {

    private httpHeaders = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*'
        })
      }
      constructor(private httpClient: HttpClient) {
    
      }
      // getAllPage(page: number, size: number, search: string) {

      //   return this.httpClient.get<Niveau[]>(`${environment.apiUrl}/niveaux/${page}/${size}/${search}`,this.httpHeaders);
      // }
      getAll() {

        return this.httpClient.get<Niveau[]>(`${environment.apiUrl}/niveaux`,this.httpHeaders);
      }
      // countNiveau(search: string) {
      //   return this.httpClient.get<Count>(`${environment.apiUrl}/niveaux/count/${search}`);
      // }
  
    
      delete(id: number) {
        return this.httpClient.delete<void>(`${environment.apiUrl}/niveaux/${id}`,this.httpHeaders)
      }
    
      save(niveau: Niveau) {
        return this.httpClient.post<any>(`${environment.apiUrl}/niveaux`, niveau, this.httpHeaders)
          .pipe(map(savedNiveau => { return savedNiveau }));
      }
    
      update(niveau: Niveau) {
        return this.httpClient.put<any>(`${environment.apiUrl}/niveaux`, niveau, this.httpHeaders)
          .pipe(map(savedNiveau => { return savedNiveau }));
      }
     
}