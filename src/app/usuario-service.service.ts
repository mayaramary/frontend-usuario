import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  private apiUrlselect = 'http://localhost/projetoembras/api/getUsuarios.php' // API select
  private apiUrldelete = 'http://localhost/projetoembras/api/deleteUsuarios.php?id=' // API delete
  private apiUrlinseredados = 'http://localhost/projetoembras/api/setUsuario.php' // API insere dados

  constructor(private http: HttpClient) { }

  // Método para obter dados da API
  getDados(): Observable<any> {
    return this.http.get<any>(this.apiUrlselect);
  }
  deleteDados(id : number): Observable<any> {
    return this.http.get<any>(this.apiUrldelete+id);
  }
  insereDados(nome : any,email : any): Observable<any> {
    let params = new HttpParams();
    params = params.set('nome', nome);
    params = params.set('email', email);
    /*const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });*/
    return this.http.post<any>(this.apiUrlinseredados, params);
  }
}
