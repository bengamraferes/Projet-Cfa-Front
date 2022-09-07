import { environment } from '../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Count } from '../_models/count';
import { Evaluation } from '../_models/evaluation';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' }) //@Service , ce service va pouvoir être injecté dans les différents composants


export class EvaluationService {

    private httpHeaders = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*'
        })
      }
      constructor(private httpClient: HttpClient) {
    
      }
    
      getByEtudaintAndEpreuve(idEtudiant: number, idEpreuve: number) {
       
        return this.httpClient.get<Evaluation>(`${environment.apiUrl}/evaluations/byEtudiantAndEpreuve/${idEtudiant}/${idEpreuve}`,this.httpHeaders);
      }
   
       save(evaluation: Evaluation) {
        return this.httpClient.post<any>(`${environment.apiUrl}/evaluations`, evaluation, this.httpHeaders)
          .pipe(map(saveEvaluation => { return saveEvaluation }));
      }
    
      update(evaluation: Evaluation) {
        return this.httpClient.put<any>(`${environment.apiUrl}/evaluations`, evaluation, this.httpHeaders)
          .pipe(map(saveEvaluation => { return saveEvaluation }));
      }
}
