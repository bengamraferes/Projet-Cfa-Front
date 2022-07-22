import { environment } from './../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map  } from "rxjs";
import { BlocCompetences } from '../_models/blocCompetences';
import { Competences } from '../_models/competences';

@Injectable({ providedIn: 'root' }) //@Service , ce service va pouvoir être injecté dans les différents composants


export class CompetencesService {

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

        return this.httpClient.get<Competences[]>(`${environment.apiUrl}/competences/${page}/${size}/${search}`,this.httpHeaders);
      }
      getAllByBlocCompId(id : number){
        return this.httpClient.get<Competences[]>(`${environment.apiUrl}/competences/blocCompetence/${id}`,this.httpHeaders);

      }
      getAllByBlocCompIdSearch(id : number, search: string){
        return this.httpClient.get<Competences[]>(`${environment.apiUrl}/competences/blocCompetence/${id}/${search}`,this.httpHeaders);

      }
      count(search: string) {
        return this.httpClient.get<any>(`${environment.apiUrl}/competences/count/${search}`);
      }
      delete(id: number) {
        return this.httpClient.delete<void>(`${environment.apiUrl}/competences/${id}`,this.httpHeaders).pipe(map(deleteI => { return deleteI }));
      }
    
      save(blocC: BlocCompetences) {
        return this.httpClient.post<any>(`${environment.apiUrl}/competences`, blocC, this.httpHeaders)
          .pipe(map(savedblocC => { return savedblocC}));
      }
    
      update(blocC: BlocCompetences) {
        return this.httpClient.put<any>(`${environment.apiUrl}/competences`, blocC, this.httpHeaders)
          .pipe(map(savedblocC => { return savedblocC }));
      }
}