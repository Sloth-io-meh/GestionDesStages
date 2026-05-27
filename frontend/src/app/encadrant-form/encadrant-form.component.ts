import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { NotificationService } from '../notification.service';

@Component({
  standalone: false,
  selector: 'app-encadrant-form',
  templateUrl: './encadrant-form.component.html'
})
export class EncadrantFormComponent implements OnInit {
  encadrantForm: FormGroup;
  editMode = false;
  encadrantId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    this.encadrantForm = this.fb.group({
      id: [null],
      nom: ['', Validators.required],
      departement: ['', Validators.required],
      etablissement: ['', Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    if (id) {
      this.editMode = true;
      this.encadrantId = +id;
      this.apiService.getEncadrant(this.encadrantId).subscribe(
        data => this.encadrantForm.patchValue(data),
        error => this.notificationService.error('Erreur chargement encadrant')
      );
    }
  }

  onSubmit() {
    if (this.encadrantForm.valid) {
      const obs = this.editMode && this.encadrantId
        ? this.apiService.updateEncadrant(this.encadrantId, this.encadrantForm.value)
        : this.apiService.createEncadrant(this.encadrantForm.value);

      obs.subscribe(
        () => {
          this.notificationService.success('Encadrant enregistré');
          this.router.navigate(['/encadrants']);
        },
        error => this.notificationService.error('Erreur lors de l\'enregistrement')
      );
    }
  }
}
