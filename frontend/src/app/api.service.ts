import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stage, Filiere, Etudiant, Entreprise, EncadrantAcademique } from './models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getStages(): Observable<Stage[]> {
    return this.http.get<Stage[]>('/api/stages');
  }

  getStagesByFiliere(filiereId: number): Observable<Stage[]> {
    return this.http.get<Stage[]>(`/api/stages/filiere/${filiereId}`);
  }

  getStagesByYear(year: number): Observable<Stage[]> {
    return this.http.get<Stage[]>(`/api/stages/annee/${year}`);
  }

  getFilieres(): Observable<Filiere[]> {
    return this.http.get<Filiere[]>('/api/filieres');
  }

  getFiliere(id: number): Observable<Filiere> {
    return this.http.get<Filiere>(`/api/filieres/${id}`);
  }

  createFiliere(filiere: Filiere): Observable<Filiere> {
    return this.http.post<Filiere>('/api/filieres', filiere);
  }

  updateFiliere(id: number, filiere: Filiere): Observable<Filiere> {
    return this.http.put<Filiere>(`/api/filieres/${id}`, filiere);
  }

  // Stages
  getStage(id: number): Observable<Stage> {
    return this.http.get<Stage>(`/api/stages/${id}`);
  }

  createStage(stage: Stage): Observable<Stage> {
    return this.http.post<Stage>('/api/stages', stage);
  }

  updateStage(id: number, stage: Stage): Observable<Stage> {
    return this.http.put<Stage>(`/api/stages/${id}`, stage);
  }

  deleteStage(id: number): Observable<void> {
    return this.http.delete<void>(`/api/stages/${id}`);
  }

  // Students (Etudiants)
  getEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>('/api/etudiants');
  }

  getEtudiant(id: number): Observable<Etudiant> {
    return this.http.get<Etudiant>(`/api/etudiants/${id}`);
  }

  createEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    return this.http.post<Etudiant>('/api/etudiants', etudiant);
  }

  updateEtudiant(id: number, etudiant: Etudiant): Observable<Etudiant> {
    return this.http.put<Etudiant>(`/api/etudiants/${id}`, etudiant);
  }

  deleteEtudiant(id: number): Observable<void> {
    return this.http.delete<void>(`/api/etudiants/${id}`);
  }

  // Entreprises
  getEntreprises(): Observable<Entreprise[]> {
    return this.http.get<Entreprise[]>('/api/entreprises');
  }

  getEntreprise(id: number): Observable<Entreprise> {
    return this.http.get<Entreprise>(`/api/entreprises/${id}`);
  }

  createEntreprise(entreprise: Entreprise): Observable<Entreprise> {
    return this.http.post<Entreprise>('/api/entreprises', entreprise);
  }

  updateEntreprise(id: number, entreprise: Entreprise): Observable<Entreprise> {
    return this.http.put<Entreprise>(`/api/entreprises/${id}`, entreprise);
  }

  deleteEntreprise(id: number): Observable<void> {
    return this.http.delete<void>(`/api/entreprises/${id}`);
  }

  // Encadrants
  getEncadrants(): Observable<EncadrantAcademique[]> {
    return this.http.get<EncadrantAcademique[]>('/api/encadrants');
  }

  getEncadrant(id: number): Observable<EncadrantAcademique> {
    return this.http.get<EncadrantAcademique>(`/api/encadrants/${id}`);
  }

  createEncadrant(encadrant: EncadrantAcademique): Observable<EncadrantAcademique> {
    return this.http.post<EncadrantAcademique>('/api/encadrants', encadrant);
  }

  updateEncadrant(id: number, encadrant: EncadrantAcademique): Observable<EncadrantAcademique> {
    return this.http.put<EncadrantAcademique>(`/api/encadrants/${id}`, encadrant);
  }

  deleteEncadrant(id: number): Observable<void> {
    return this.http.delete<void>(`/api/encadrants/${id}`);
  }

  // Filieres
  deleteFiliere(id: number): Observable<void> {
    return this.http.delete<void>(`/api/filieres/${id}`);
  }

  exportPdf(id: number): Observable<Blob> {
    return this.http.get(`/api/stages/${id}/export`, { responseType: 'blob' });
  }

  exportStagesByFilierePdf(filiereId: number): Observable<Blob> {
    return this.http.get(`/api/stages/filiere/${filiereId}/export`, { responseType: 'blob' });
  }

  exportAllStagesPdf(): Observable<Blob> {
    return this.http.get(`/api/stages/export`, { responseType: 'blob' });
  }
  }
