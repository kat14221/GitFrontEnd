import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Medico } from '../models/medico';
@Injectable({
    providedIn: 'root'
  })
export class MedicoService{
    private ApiURl="http://localhost:8080/medico";
    constructor(private http: HttpClient) { }

  getMedicos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.ApiURl);
  }
  getMedicobyID(id: number): Observable<Medico> {
    return this.http.get<Medico>(`${this.ApiURl}/${id}`);
  }
  updateMedico(id: number, medico: Medico): Observable<Medico> {
    return this.http.put<Medico>(`${this.ApiURl}/${id}`, medico);
  }
  deleteMedico(id: number): Observable<Medico> {
    return this.http.delete<Medico>(`${this.ApiURl}/${id}`);
  }
  crearMedico(medico: Medico): Observable<Medico> {
    return this.http.post<Medico>(this.ApiURl, medico);
  }

  
}