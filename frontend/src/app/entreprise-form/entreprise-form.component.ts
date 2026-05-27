import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { NotificationService } from '../notification.service';

@Component({
  standalone: false,
  selector: 'app-entreprise-form',
  templateUrl: './entreprise-form.component.html'
})
export class EntrepriseFormComponent implements OnInit {
  entrepriseForm: FormGroup;
  editMode = false;
  entrepriseId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    this.entrepriseForm = this.fb.group({
      id: [null],
      nom: ['', Validators.required],
      adresse: [''],
      telephone: [''],
      email: ['', [Validators.email]],
      ville: ['', Validators.required],
      pays: ['', Validators.required],
      nomResponsable: [''],
      nomEncadrant: [''],
      emailEncadrant: ['', [Validators.email]],
      telEncadrant: ['']
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    if (id) {
      this.editMode = true;
      this.entrepriseId = +id;
      this.apiService.getEntreprise(this.entrepriseId).subscribe(
        data => this.entrepriseForm.patchValue(data),
        error => this.notificationService.error('Erreur chargement entreprise')
      );
    }
  }

  onSubmit() {
    if (this.entrepriseForm.valid) {
      const obs = this.editMode && this.entrepriseId
        ? this.apiService.updateEntreprise(this.entrepriseId, this.entrepriseForm.value)
        : this.apiService.createEntreprise(this.entrepriseForm.value);

      obs.subscribe(
        () => {
          this.notificationService.success('Entreprise enregistrée');
          this.router.navigate(['/entreprises']);
        },
        error => this.notificationService.error('Erreur lors de l\'enregistrement')
      );
    }
  }
}
