import { environment } from './../../environments/environment';
import { Etudiant } from './../_models/etudiant';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map ,throwError } from "rxjs";
@Injectable({ providedIn: 'root' })
export class EtudiantService {

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

        return this.httpClient.get<Etudiant[]>(`${environment.apiUrl}/etudiants/${page}/${size}/${search}`,this.httpHeaders);
      }
      findById(id: number) {
        return this.httpClient.get<any>(`${environment.apiUrl}/etudiants/${id}`,this.httpHeaders)
          .pipe(map(userFound => { return userFound; }));
      }
    
      countUsers(search: string) {
        return this.httpClient.get<any>(`${environment.apiUrl}/etudiants/count/${search}`,this.httpHeaders);
      }
    
      delete(id: number) {
        return this.httpClient.delete<void>(`${environment.apiUrl}/etudiants/${id}`,this.httpHeaders)
      }
    
      save(etudiant: Etudiant) {
        return this.httpClient.post<any>(`${environment.apiUrl}/etudiants`, etudiant, this.httpHeaders)
          .pipe(map(savedUser => { return savedUser }));
      }
    
      update(etudiant: Etudiant) {
        return this.httpClient.put<any>(`${environment.apiUrl}/etudiants`, etudiant, this.httpHeaders)
          .pipe(map(savedUser => { return savedUser }));
      }
    }