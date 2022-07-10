
import {  HttpHeaders } from '@angular/common/http';
import { LoginResponse } from './../_models/loginResponse';


export  const  httpHeaders = {
    headers
}

function headers(){


    let loginResponce :LoginResponse = JSON.parse(localStorage.getItem('currentUser')!);
     
    const authorization ={'Authorization': 'Bearer ' +  loginResponce.token}
   
    return  new HttpHeaders({
        ...authorization,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    })
}