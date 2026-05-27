import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Etudiant, Entreprise, EncadrantAcademique } from '../models';
import { NotificationService } from '../notification.service';

@Component({
  standalone: false,
  selector: 'app-stage-form',
  templateUrl: './stage-form.component.html'
})
export class StageFormComponent implements OnInit {
  stageForm: FormGroup;
  etudiants: Etudiant[] = [];
  entreprises: Entreprise[] = [];
  encadrants: EncadrantAcademique[] = [];
  editMode = false;
  stageId: number | null = null;

  etudiantLabel = (e: Etudiant) => `${e.nom} ${e.prenom} (${e.cne})`;
  encadrantLabel = (e: EncadrantAcademique) => `${e.nom} - ${e.departement}`;
  entrepriseLabel = (e: Entreprise) => `${e.nom} (${e.ville})`;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    this.stageForm = this.fb.group({
      id: [null],
      sujet: ['', Validators.required],
      description: [''],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      objectifs: [''],
      solution: [''],
      demarche: [''],
      outils: [''],
      etudiant: [null, Validators.required],
      entreprise: [null, Validators.required],
      encadrantAcademique: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.apiService.getEtudiants().subscribe(
      data => this.etudiants = data,
      error => this.notificationService.error('Erreur chargement étudiants')
    );
    this.apiService.getEntreprises().subscribe(
      data => this.entreprises = data,
      error => this.notificationService.error('Erreur chargement entreprises')
    );
    this.apiService.getEncadrants().subscribe(
      data => this.encadrants = data,
      error => this.notificationService.error('Erreur chargement encadrants')
    );

    const id = this.route.snapshot.params.id;
    if (id) {
      this.editMode = true;
      this.stageId = +id;
      this.apiService.getStage(this.stageId).subscribe(
        stage => this.stageForm.patchValue(stage),
        error => this.notificationService.error('Erreur chargement détails stage')
      );
    }
  }

  compareById(item1: any, item2: any) {
    return item1 && item2 ? item1.id === item2.id : item1 === item2;
  }

  onSubmit() {
    if (this.stageForm.valid) {
      if (this.editMode && this.stageId) {
        this.apiService.updateStage(this.stageId, this.stageForm.value).subscribe(
          () => {
            this.notificationService.success('Stage mis à jour avec succès');
            this.router.navigate(['/']);
          },
          error => this.notificationService.error('Erreur lors de la mise à jour')
        );
      } else {
        this.apiService.createStage(this.stageForm.value).subscribe(
          () => {
            this.notificationService.success('Stage enregistré avec succès');
            this.router.navigate(['/']);
          },
          error => this.notificationService.error('Erreur lors de l\'enregistrement')
        );
      }
    }
  }
}
