import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StageListComponent } from './stage-list/stage-list.component';
import { StageFormComponent } from './stage-form/stage-form.component';
import { EtudiantListComponent } from './etudiant-list/etudiant-list.component';
import { EtudiantFormComponent } from './etudiant-form/etudiant-form.component';
import { FiliereListComponent } from './filiere-list/filiere-list.component';
import { FiliereFormComponent } from './filiere-form/filiere-form.component';
import { EntrepriseListComponent } from './entreprise-list/entreprise-list.component';
import { EntrepriseFormComponent } from './entreprise-form/entreprise-form.component';
import { EncadrantListComponent } from './encadrant-list/encadrant-list.component';
import { EncadrantFormComponent } from './encadrant-form/encadrant-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'stages', component: StageListComponent, canActivate: [AuthGuard] },
  { path: 'stages/nouveau', component: StageFormComponent, canActivate: [AuthGuard] },
  { path: 'stages/modifier/:id', component: StageFormComponent, canActivate: [AuthGuard] },
  { path: 'etudiants', component: EtudiantListComponent, canActivate: [AuthGuard] },
  { path: 'etudiants/nouveau', component: EtudiantFormComponent, canActivate: [AuthGuard] },
  { path: 'etudiants/modifier/:id', component: EtudiantFormComponent, canActivate: [AuthGuard] },
  { path: 'filieres', component: FiliereListComponent, canActivate: [AuthGuard] },
  { path: 'filieres/nouveau', component: FiliereFormComponent, canActivate: [AuthGuard] },
  { path: 'filieres/modifier/:id', component: FiliereFormComponent, canActivate: [AuthGuard] },
  { path: 'entreprises', component: EntrepriseListComponent, canActivate: [AuthGuard] },
  { path: 'entreprises/nouveau', component: EntrepriseFormComponent, canActivate: [AuthGuard] },
  { path: 'entreprises/modifier/:id', component: EntrepriseFormComponent, canActivate: [AuthGuard] },
  { path: 'encadrants', component: EncadrantListComponent, canActivate: [AuthGuard] },
  { path: 'encadrants/nouveau', component: EncadrantFormComponent, canActivate: [AuthGuard] },
  { path: 'encadrants/modifier/:id', component: EncadrantFormComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
