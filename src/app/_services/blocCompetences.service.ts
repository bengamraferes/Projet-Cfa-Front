import { environment } from './../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map  } from "rxjs";
import { BlocCompetences } from '../_models/blocCompetences';

@Injectable({ providedIn: 'root' }) //@Service , ce service va pouvoir être injecté dans les différents composants


export class BlocCompetencesService {

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

        return this.httpClient.get<BlocCompetences[]>(`${environment.apiUrl}/blocsCompetence/${page}/${size}/${search}`,this.httpHeaders);
      }
      count(search: string) {
        return this.httpClient.get<any>(`${environment.apiUrl}/blocsCompetence/count/${search}`);
      }
      delete(id: number) {
        return this.httpClient.delete<void>(`${environment.apiUrl}/blocsCompetence/${id}`,this.httpHeaders).pipe(map(deleteI => { return deleteI }));
      }
    
      save(blocC: BlocCompetences) {
        return this.httpClient.post<any>(`${environment.apiUrl}/blocsCompetence`, blocC, this.httpHeaders)
          .pipe(map(savedblocC => { return savedblocC}));
      }
    
      update(blocC: BlocCompetences) {
        return this.httpClient.put<any>(`${environment.apiUrl}/blocsCompetence`, blocC, this.httpHeaders)
          .pipe(map(savedblocC => { return savedblocC }));
      }
}