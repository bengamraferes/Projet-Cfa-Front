import { environment } from './../../environments/environment';
import { Promotion } from './../_models/promotion';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map ,throwError } from "rxjs";
import { Count } from '../_models/count';

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
        return this.httpClient.get<Count>(`${environment.apiUrl}/promotions/count/${search}`);
      }
  
    
      delete(id: number) {
        return this.httpClient.delete<void>(`${environment.apiUrl}/promotions/${id}`,this.httpHeaders)
      }
    
      save(promo: Promotion) {
        return this.httpClient.post<any>(`${environment.apiUrl}/promotions`, promo, this.httpHeaders)
          .pipe(map(savedPrmo => { return savedPrmo }));
      }
    
      update(promo: Promotion) {
        return this.httpClient.put<any>(`${environment.apiUrl}/promotions`, promo, this.httpHeaders)
          .pipe(map(savedPrmo => { return savedPrmo }));
      }
     
}