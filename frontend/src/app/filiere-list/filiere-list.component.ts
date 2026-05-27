import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../api.service';
import { Filiere } from '../models';
import { NotificationService } from '../notification.service';

@Component({
  standalone: false,
  selector: 'app-filiere-list',
  templateUrl: './filiere-list.component.html'
})
export class FiliereListComponent implements OnInit {
  filieres: Filiere[] = [];
  filteredFilieres: Filiere[] = [];
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
    this.loadFilieres();
  }

  loadFilieres() {
    this.apiService.getFilieres().subscribe(
      data => { this.filieres = data; this.applyFilter(); this.cdr.detectChanges(); },
      error => this.notificationService.error('Erreur chargement filières')
    );
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.currentPage = 1;
    this.applyFilter();
  }

  applyFilter() {
    this.filteredFilieres = this.filieres.filter(f => 
      (f.intitule && f.intitule.toLowerCase().includes(this.searchTerm)) ||
      (f.responsable && f.responsable.nom && f.responsable.nom.toLowerCase().includes(this.searchTerm)) ||
      (f.responsable && f.responsable.prenom && f.responsable.prenom.toLowerCase().includes(this.searchTerm))
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
    return Math.ceil(this.filteredFilieres.length / this.pageSize);
  }

  get paginatedFilieres(): Filiere[] {
    return this.filteredFilieres.slice(this.startIndex, this.startIndex + this.pageSize);
  }

  get startIndex(): number {
    return this.filteredFilieres.length > 0 ? (this.currentPage - 1) * this.pageSize : -1;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.pageSize, this.filteredFilieres.length);
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

  deleteFiliere(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cette filière ? Cela supprimera également son responsable.')) {
      this.apiService.deleteFiliere(id).subscribe(
        () => {
          this.notificationService.success('Filière supprimée');
          this.loadFilieres();
        },
        error => this.notificationService.error('Erreur suppression filière')
      );
    }
  }
}
