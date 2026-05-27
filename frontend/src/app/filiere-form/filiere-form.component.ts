import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { NotificationService } from '../notification.service';

@Component({
  standalone: false,
  selector: 'app-filiere-form',
  templateUrl: './filiere-form.component.html'
})
export class FiliereFormComponent implements OnInit {
  filiereForm: FormGroup;
  editMode = false;
  filiereId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    this.filiereForm = this.fb.group({
      id: [null],
      intitule: ['', Validators.required],
      responsable: this.fb.group({
        id: [null],
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        grade: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        tel: ['']
      })
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    if (id) {
      this.editMode = true;
      this.filiereId = +id;
      this.apiService.getFiliere(this.filiereId).subscribe(
        data => this.filiereForm.patchValue(data),
        error => this.notificationService.error('Erreur chargement filière')
      );
    }
  }

  onSubmit() {
    if (this.filiereForm.valid) {
      if (this.editMode && this.filiereId) {
        this.apiService.updateFiliere(this.filiereId, this.filiereForm.value).subscribe(
          () => {
            this.notificationService.success('Filière mise à jour');
            this.router.navigate(['/filieres']);
          },
          error => this.notificationService.error('Erreur mise à jour')
        );
      } else {
        this.apiService.createFiliere(this.filiereForm.value).subscribe(
          () => {
            this.notificationService.success('Filière créée');
            this.router.navigate(['/filieres']);
          },
          error => this.notificationService.error('Erreur création')
        );
      }
    }
  }
}
