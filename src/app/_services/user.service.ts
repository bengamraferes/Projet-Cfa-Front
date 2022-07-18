import { environment } from './../../environments/environment';
import { User } from './../_models/user';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map ,throwError } from "rxjs";
@Injectable({ providedIn: 'root' }) //@Service , ce service va pouvoir être injecté dans les différents composants
export class UserService {

  private httpHeaders = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  }
  constructor(private httpClient: HttpClient) {

  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  //TODO remplacer l'url par ${environment.apiUrl}

  getAll(page: number, size: number, search: string) {

    return this.httpClient.get<User[]>(`${environment.apiUrl}/utilisateurs/${page}/${size}/${search}`,this.httpHeaders);
  }
  getByRole( role: string) {

    return this.httpClient.get<User[]>(`${environment.apiUrl}/utilisateurs/role/${role}`,this.httpHeaders);
  }
  findById(id: number) {
    return this.httpClient.get<any>(`${environment.apiUrl}/utilisateurs/${id}`,this.httpHeaders)
      .pipe(map(userFound => { return userFound; }));
  }

  countUsers(search: string) {
    return this.httpClient.get<any>(`${environment.apiUrl}/utilisateurs/count/${search}`,this.httpHeaders);
  }

  delete(id: number) {
    return this.httpClient.delete<void>(`${environment.apiUrl}/utilisateurs/${id}`,this.httpHeaders).pipe(
      catchError(this.handleError)
    );
  }

  save(user: User) {
    return this.httpClient.post<any>(`${environment.apiUrl}/utilisateurs`, user, this.httpHeaders)
      .pipe(map(savedUser => { return savedUser }));
  }

  update(user: User) {
    return this.httpClient.put<any>(`${environment.apiUrl}/utilisateurs`, user, this.httpHeaders)
      .pipe(map(savedUser => { return savedUser }));
  }

}
