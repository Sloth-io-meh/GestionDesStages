import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Etudiant } from '../models';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-etudiant-list',
  templateUrl: './etudiant-list.component.html'
})
export class EtudiantListComponent implements OnInit {
  etudiants: Etudiant[] = [];
  filteredEtudiants: Etudiant[] = [];
  searchTerm: string = '';

  // Pagination
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadEtudiants();
  }

  loadEtudiants() {
    this.apiService.getEtudiants().subscribe(
      data => {
        this.etudiants = data;
        this.applyFilter();
      },
      error => this.notificationService.error('Erreur chargement étudiants')
    );
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.currentPage = 1;
    this.applyFilter();
  }

  applyFilter() {
    this.filteredEtudiants = this.etudiants.filter(e => 
      (e.nom && e.nom.toLowerCase().includes(this.searchTerm)) ||
      (e.prenom && e.prenom.toLowerCase().includes(this.searchTerm)) ||
      (e.cne && e.cne.toLowerCase().includes(this.searchTerm)) ||
      (e.email && e.email.toLowerCase().includes(this.searchTerm))
    );

    // Boundary check
    const maxPage = this.totalPages;
    if (this.currentPage > maxPage && maxPage > 0) {
      this.currentPage = maxPage;
    } else if (maxPage === 0) {
      this.currentPage = 1;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredEtudiants.length / this.pageSize);
  }

  get paginatedEtudiants(): Etudiant[] {
    return this.filteredEtudiants.slice(this.startIndex, this.startIndex + this.pageSize);
  }

  get startIndex(): number {
    return this.filteredEtudiants.length > 0 ? (this.currentPage - 1) * this.pageSize : -1;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.pageSize, this.filteredEtudiants.length);
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

  deleteEtudiant(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet étudiant ?')) {
      this.apiService.deleteEtudiant(id).subscribe(
        () => {
          this.notificationService.success('Étudiant supprimé');
          this.loadEtudiants();
        },
        error => this.notificationService.error('Erreur suppression')
      );
    }
  }
}
