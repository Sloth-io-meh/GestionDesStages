import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Stage, Filiere, Etudiant } from '../models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  stats = {
    totalStages: 0,
    totalStudents: 0,
    totalFilieres: 0,
    totalEntreprises: 0
  };
  recentStages: Stage[] = [];
  filiereBreakdown: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getFilieres().subscribe(filieres => {
      this.stats.totalFilieres = filieres.length;
      
      this.apiService.getStages().subscribe(stages => {
        this.stats.totalStages = stages.length;
        this.recentStages = stages.slice(-5).reverse();
        
        // Calculate breakdown
        this.filiereBreakdown = filieres.map(f => {
          const count = stages.filter(s => s.etudiant && s.etudiant.filiere && s.etudiant.filiere.id === f.id).length;
          const percentage = this.stats.totalStages > 0 ? (count / this.stats.totalStages) * 100 : 0;
          return {
            intitule: f.intitule,
            count: count,
            percentage: percentage
          };
        });
      });
    });

    this.apiService.getEtudiants().subscribe(data => this.stats.totalStudents = data.length);
    this.apiService.getEntreprises().subscribe(data => this.stats.totalEntreprises = data.length);
  }
}
