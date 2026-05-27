import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../api.service';
import { Entreprise } from '../models';
import { NotificationService } from '../notification.service';

@Component({
  standalone: false,
  selector: 'app-entreprise-list',
  templateUrl: './entreprise-list.component.html'
})
export class EntrepriseListComponent implements OnInit {
  entreprises: Entreprise[] = [];
  filteredEntreprises: Entreprise[] = [];
  searchTerm: string = '';

  // Pagination
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadEntreprises();
  }

  loadEntreprises() {
    this.apiService.getEntreprises().subscribe(
      data => { this.entreprises = data; this.applyFilter(); this.cdr.detectChanges(); },
      error => this.notificationService.error('Erreur chargement entreprises')
    );
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.currentPage = 1;
    this.applyFilter();
  }

  applyFilter() {
    this.filteredEntreprises = this.entreprises.filter(e => 
      (e.nom && e.nom.toLowerCase().includes(this.searchTerm)) ||
      (e.ville && e.ville.toLowerCase().includes(this.searchTerm)) ||
      (e.adresse && e.adresse.toLowerCase().includes(this.searchTerm)) ||
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
    return Math.ceil(this.filteredEntreprises.length / this.pageSize);
  }

  get paginatedEntreprises(): Entreprise[] {
    return this.filteredEntreprises.slice(this.startIndex, this.startIndex + this.pageSize);
  }

  get startIndex(): number {
    return this.filteredEntreprises.length > 0 ? (this.currentPage - 1) * this.pageSize : -1;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.pageSize, this.filteredEntreprises.length);
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

  deleteEntreprise(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cette entreprise ?')) {
      this.apiService.deleteEntreprise(id).subscribe(
        () => {
          this.notificationService.success('Entreprise supprimée');
          this.loadEntreprises();
        },
        error => this.notificationService.error('Erreur suppression')
      );
    }
  }
}
