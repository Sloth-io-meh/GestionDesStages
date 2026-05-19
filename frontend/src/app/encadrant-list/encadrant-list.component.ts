import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { EncadrantAcademique } from '../models';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-encadrant-list',
  templateUrl: './encadrant-list.component.html'
})
export class EncadrantListComponent implements OnInit {
  encadrants: EncadrantAcademique[] = [];
  filteredEncadrants: EncadrantAcademique[] = [];
  searchTerm: string = '';

  // Pagination
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadEncadrants();
  }

  loadEncadrants() {
    this.apiService.getEncadrants().subscribe(
      data => {
        this.encadrants = data;
        this.applyFilter();
      },
      error => this.notificationService.error('Erreur chargement encadrants')
    );
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.currentPage = 1;
    this.applyFilter();
  }

  applyFilter() {
    this.filteredEncadrants = this.encadrants.filter(e => 
      (e.nom && e.nom.toLowerCase().includes(this.searchTerm)) ||
      (e.departement && e.departement.toLowerCase().includes(this.searchTerm)) ||
      (e.etablissement && e.etablissement.toLowerCase().includes(this.searchTerm))
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
    return Math.ceil(this.filteredEncadrants.length / this.pageSize);
  }

  get paginatedEncadrants(): EncadrantAcademique[] {
    return this.filteredEncadrants.slice(this.startIndex, this.startIndex + this.pageSize);
  }

  get startIndex(): number {
    return this.filteredEncadrants.length > 0 ? (this.currentPage - 1) * this.pageSize : -1;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.pageSize, this.filteredEncadrants.length);
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

  deleteEncadrant(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet encadrant ?')) {
      this.apiService.deleteEncadrant(id).subscribe(
        () => {
          this.notificationService.success('Encadrant supprimé');
          this.loadEncadrants();
        },
        error => this.notificationService.error('Erreur suppression')
      );
    }
  }
}
