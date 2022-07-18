import { environment } from './../../environments/environment';
import { Intervention } from './../_models/intervention';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map  } from "rxjs";

@Injectable({ providedIn: 'root' }) //@Service , ce service va pouvoir être injecté dans les différents composants


export class InterventionService {

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

        return this.httpClient.get<Intervention[]>(`${environment.apiUrl}/interventions/${page}/${size}/${search}`,this.httpHeaders);
      }
      countIntervention(search: string) {
        return this.httpClient.get<any>(`${environment.apiUrl}/interventions/count/${search}`);
      }
      delete(id: number) {
        return this.httpClient.delete<void>(`${environment.apiUrl}/interventions/${id}`,this.httpHeaders).pipe(map(deleteI => { return deleteI }));
      }
    
      save(intervention: Intervention) {
        return this.httpClient.post<any>(`${environment.apiUrl}/interventions`, intervention, this.httpHeaders)
          .pipe(map(savedIntervention => { return savedIntervention }));
      }
    
      update(intervention: Intervention) {
        return this.httpClient.put<any>(`${environment.apiUrl}/interventions`, intervention, this.httpHeaders)
          .pipe(map(savedIntervention => { return savedIntervention }));
      }
}