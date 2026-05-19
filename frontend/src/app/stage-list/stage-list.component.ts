import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Stage, Filiere } from '../models';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-stage-list',
  templateUrl: './stage-list.component.html',
  styleUrls: ['./stage-list.component.css']
})
export class StageListComponent implements OnInit {
  stages: Stage[] = [];
  filteredStages: Stage[] = [];
  filieres: Filiere[] = [];
  selectedFiliereId: number | null = null;
  selectedYear: number | null = null;
  years: number[] = [2024, 2025, 2026, 2027];
  searchTerm: string = '';
  
  // Pagination
  currentPage: number = 1;
  pageSize: number = 10;

  // Statistics
  stats = {
    totalStages: 0,
    totalFilieres: 0,
    totalStudents: 0
  };

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadStages();
    this.loadFilieres();
    this.loadStudents();
  }

  loadStages() {
    this.apiService.getStages().subscribe(
      data => {
        this.stages = data;
        this.stats.totalStages = data.length;
        this.applyFilter();
      },
      error => this.notificationService.error('Erreur lors du chargement des stages')
    );
  }

  loadFilieres() {
    this.apiService.getFilieres().subscribe(
      data => {
        this.filieres = data;
        this.stats.totalFilieres = data.length;
      },
      error => this.notificationService.error('Erreur lors du chargement des filières')
    );
  }

  loadStudents() {
    this.apiService.getEtudiants().subscribe(
      data => {
        this.stats.totalStudents = data.length;
      },
      error => this.notificationService.error('Erreur lors du chargement des étudiants')
    );
  }

  onFiliereChange(event: any) {
    this.selectedFiliereId = event.target.value ? +event.target.value : null;
    this.currentPage = 1;
    this.applyFilter();
  }

  onYearChange(event: any) {
    this.selectedYear = event.target.value ? +event.target.value : null;
    this.currentPage = 1;
    this.applyFilter();
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.currentPage = 1;
    this.applyFilter();
  }

  getSelectedFiliere(): Filiere | undefined {
    return this.filieres.find(f => f.id === this.selectedFiliereId);
  }

  applyFilter() {
    this.filteredStages = this.stages.filter(s => {
      // Filiere Filter
      if (this.selectedFiliereId && (!s.etudiant || !s.etudiant.filiere || s.etudiant.filiere.id !== this.selectedFiliereId)) {
        return false;
      }

      // Year Filter
      if (this.selectedYear && (!s.dateDebut || new Date(s.dateDebut).getFullYear() !== this.selectedYear)) {
        return false;
      }

      // Search Term Filter
      const subject = s.sujet ? s.sujet.toLowerCase() : '';
      const nom = s.etudiant && s.etudiant.nom ? s.etudiant.nom.toLowerCase() : '';
      const prenom = s.etudiant && s.etudiant.prenom ? s.etudiant.prenom.toLowerCase() : '';
      const entreprise = s.entreprise && s.entreprise.nom ? s.entreprise.nom.toLowerCase() : '';
      
      return subject.includes(this.searchTerm) ||
             nom.includes(this.searchTerm) ||
             prenom.includes(this.searchTerm) ||
             entreprise.includes(this.searchTerm);
    });

    // Boundary check
    const maxPage = this.totalPages;
    if (this.currentPage > maxPage && maxPage > 0) {
      this.currentPage = maxPage;
    } else if (maxPage === 0) {
      this.currentPage = 1;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredStages.length / this.pageSize);
  }

  get paginatedStages(): Stage[] {
    return this.filteredStages.slice(this.startIndex, this.startIndex + this.pageSize);
  }

  get startIndex(): number {
    return this.filteredStages.length > 0 ? (this.currentPage - 1) * this.pageSize : -1;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.pageSize, this.filteredStages.length);
  }

  onPageSizeChange(event: any) {
    this.pageSize = +event.target.value;
    this.currentPage = 1;
    this.applyFilter();
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPages(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const maxPagesToShow = 5;
    
    if (total <= maxPagesToShow) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    let start = Math.max(current - Math.floor(maxPagesToShow / 2), 1);
    let end = start + maxPagesToShow - 1;

    if (end > total) {
      end = total;
      start = end - maxPagesToShow + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  deleteStage(id: number) {
    if (confirm('Voulez-vous vraiment supprimer ce stage ?')) {
      this.apiService.deleteStage(id).subscribe(
        () => {
          this.notificationService.success('Stage supprimé avec succès');
          this.loadStages();
        },
        error => this.notificationService.error('Erreur lors de la suppression du stage')
      );
    }
  }

  exportPdf(id: number) {
    this.notificationService.show('Génération du PDF...', 'info');
    this.apiService.exportPdf(id).subscribe(blob => {
      this.downloadBlob(blob, `stage_${id}_report.pdf`);
      this.notificationService.success('PDF téléchargé');
    }, error => {
      this.notificationService.error('Erreur lors de la génération du PDF');
    });
  }

  exportFilierePdf() {
    if (!this.selectedFiliereId) return;
    this.notificationService.show('Génération du rapport filière...', 'info');
    this.apiService.exportStagesByFilierePdf(this.selectedFiliereId).subscribe(blob => {
      this.downloadBlob(blob, `rapport_filiere_${this.selectedFiliereId}.pdf`);
      this.notificationService.success('Rapport filière téléchargé');
    }, error => {
      this.notificationService.error('Erreur lors de la génération du rapport');
    });
  }

  exportAllPdf() {
    this.notificationService.show('Génération du rapport global...', 'info');
    this.apiService.exportAllStagesPdf().subscribe(blob => {
      this.downloadBlob(blob, `rapport_global_stages.pdf`);
      this.notificationService.success('Rapport global téléchargé');
    }, error => {
      this.notificationService.error('Erreur lors de la génération du rapport global');
    });
  }

  private downloadBlob(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
