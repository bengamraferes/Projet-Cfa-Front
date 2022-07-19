import { environment } from './../../environments/environment';

import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map ,throwError } from "rxjs";
 @Injectable({ providedIn: 'root' }) //@Service , ce service va pouvoir être injecté dans les différents composants
export class GeneratorService {

  private httpHeaders = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Accept':'application/octet-stream',

    })
  }
  constructor(private httpClient: HttpClient) {

  }

  getBultinEval(idPrmotion: number, idEtudiant: number) {

    return this.httpClient.get<any>(`${environment.apiUrl}/generator/bultinEval/${idEtudiant}/${idPrmotion}`, { responseType:'blob' as 'json' });
  }
}