import { environment } from './../../environments/environment';
import { TitreProfessionnel } from './../_models/titreProfessionnel';
import {Count} from './../_models/count'
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' }) //@Service , ce service va pouvoir être injecté dans les différents composants

export class TitreProfessionnelService {

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

        return this.httpClient.get<TitreProfessionnel[]>(`${environment.apiUrl}/titresProfessionnel/${page}/${size}/${search}`,this.httpHeaders);
      }
      count(search: string) {
        return this.httpClient.get<any>(`${environment.apiUrl}/titresProfessionnel/count/${search}`);
      }
      updateDg2() {
        return this.httpClient.get<Count>(`${environment.apiUrl}/titresProfessionnel/dg2`,this.httpHeaders);
      }
    }
      