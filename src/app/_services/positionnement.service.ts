import { environment } from './../../environments/environment';
import {  Positionnement } from './../_models/positionnement';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map  } from "rxjs";

@Injectable({ providedIn: 'root' }) //@Service , ce service va pouvoir être injecté dans les différents composants


export class PositionnementService {

    private httpHeaders = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
        })
      }
      constructor(private httpClient: HttpClient) {
    
      }
      getAll(page: number, size: number, search: string) {

        return this.httpClient.get<Positionnement[]>(`${environment.apiUrl}/positionnements/${page}/${size}/${search}`,this.httpHeaders);
      }
      getAllByInterventionId(id: number,) {

        return this.httpClient.get<Positionnement[]>(`${environment.apiUrl}/positionnements/intervention/${id}`,this.httpHeaders);
      }
      countPositionnement(search: string) {
        return this.httpClient.get<any>(`${environment.apiUrl}/positionnements/count/${search}`);
      }
      delete(id: number) {
        return this.httpClient.delete<void>(`${environment.apiUrl}/positionnements/${id}`,this.httpHeaders).pipe(map(deleteI => { return deleteI }));
      }
      findById(id: number) {
        return this.httpClient.get<any>(`${environment.apiUrl}/positionnements/${id}`,this.httpHeaders)
          .pipe(map(IFound => { return IFound; }));
      }
      save(positionnement: Positionnement) {
        return this.httpClient.post<any>(`${environment.apiUrl}/positionnements`, positionnement, this.httpHeaders)
          .pipe(map(savedPositionnement => { return savedPositionnement }));
      }
    
      update(positionnement: Positionnement) {
        return this.httpClient.put<any>(`${environment.apiUrl}/positionnements`, positionnement, this.httpHeaders)
          .pipe(map(savedPositionnement => { return savedPositionnement }));
      }
}