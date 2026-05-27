import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { ZoneInterceptor } from './zone.interceptor';
import { SearchableSelectComponent } from './searchable-select.component';

@NgModule({
  declarations: [
    AppComponent,
    StageListComponent,
    StageFormComponent,
    EtudiantListComponent,
    EtudiantFormComponent,
    FiliereListComponent,
    FiliereFormComponent,
    EntrepriseListComponent,
    EntrepriseFormComponent,
    EncadrantListComponent,
    EncadrantFormComponent,
    DashboardComponent,
    LoginComponent,
    SearchableSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ZoneInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
