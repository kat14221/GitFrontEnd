import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Especialidad } from '../models/especialidad';
@Injectable({
    providedIn: 'root'
  })
export class EspecialidadService{
    private ApiURl="http://localhost:8080/especialidad";
    constructor(private http: HttpClient) { }

  getEspecialidads(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(this.ApiURl);
  }
  getEspecialidadbyID(id: number): Observable<Especialidad> {
    return this.http.get<Especialidad>(`${this.ApiURl}/${id}`);
  }
  updateEspecialidad(id: number, especialidad: Especialidad): Observable<Especialidad> {
    return this.http.put<Especialidad>(`${this.ApiURl}/${id}`, especialidad);
  }
  deleteEspecialidad(id: number): Observable<Especialidad> {
    return this.http.delete<Especialidad>(`${this.ApiURl}/${id}`);
  }
  crearEspecialidad(especialidad: Especialidad): Observable<Especialidad> {
    return this.http.post<Especialidad>(this.ApiURl, especialidad);
  }

  
}