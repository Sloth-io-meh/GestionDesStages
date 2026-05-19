import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Filiere } from '../models';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-etudiant-form',
  templateUrl: './etudiant-form.component.html'
})
export class EtudiantFormComponent implements OnInit {
  etudiantForm: FormGroup;
  filieres: Filiere[] = [];
  editMode = false;
  etudiantId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    this.etudiantForm = this.fb.group({
      id: [null],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cne: ['', Validators.required],
      tel: [''],
      filiere: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.apiService.getFilieres().subscribe(
      data => this.filieres = data,
      error => this.notificationService.error('Erreur chargement filières')
    );

    const id = this.route.snapshot.params.id;
    if (id) {
      this.editMode = true;
      this.etudiantId = +id;
      this.apiService.getEtudiant(this.etudiantId).subscribe(
        data => this.etudiantForm.patchValue(data),
        error => this.notificationService.error('Erreur chargement étudiant')
      );
    }
  }

  compareById(item1: any, item2: any) {
    return item1 && item2 ? item1.id === item2.id : item1 === item2;
  }

  onSubmit() {
    if (this.etudiantForm.valid) {
      if (this.editMode && this.etudiantId) {
        this.apiService.updateEtudiant(this.etudiantId, this.etudiantForm.value).subscribe(
          () => {
            this.notificationService.success('Étudiant mis à jour');
            this.router.navigate(['/etudiants']);
          },
          error => this.notificationService.error('Erreur mise à jour')
        );
      } else {
        this.apiService.createEtudiant(this.etudiantForm.value).subscribe(
          () => {
            this.notificationService.success('Étudiant créé');
            this.router.navigate(['/etudiants']);
          },
          error => this.notificationService.error('Erreur création')
        );
      }
    }
  }
}
