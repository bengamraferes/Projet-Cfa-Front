import { environment } from './../../environments/environment';
import { Promotion } from './../_models/promotion';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map ,throwError } from "rxjs";

@Injectable({ providedIn: 'root' }) //@Service , ce service va pouvoir être injecté dans les différents composants


export class PromotionService {

    private httpHeaders = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*'
        })
      }
      constructor(private httpClient: HttpClient) {
    
      }
      getAllPage(page: number, size: number, search: string) {

        return this.httpClient.get<Promotion[]>(`${environment.apiUrl}/promotions/${page}/${size}/${search}`,this.httpHeaders);
      }
      getAll() {

        return this.httpClient.get<Promotion[]>(`${environment.apiUrl}/promotions`,this.httpHeaders);
      }
      countPromotion(search: string) {
        return this.httpClient.get<any>(`${environment.apiUrl}/promotions/count/${search}`);
      }
}