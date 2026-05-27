import { Component, Input, forwardRef, HostListener, ElementRef, ChangeDetectorRef, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-searchable-select',
  template: `
    <div class="ss-wrap" [class.ss-open]="isOpen">
      <div class="ss-display form-control" (click)="toggle()">
        <span [class.ss-placeholder]="!selectedItem">{{ selectedItem ? getLabel(selectedItem) : placeholder }}</span>
        <span class="ss-caret">&#9660;</span>
      </div>
      <div class="ss-panel" *ngIf="isOpen">
        <input class="ss-search form-control" type="text" placeholder="Rechercher..."
          [(ngModel)]="searchTerm" (ngModelChange)="filter()" (click)="$event.stopPropagation()" autofocus />
        <ul class="ss-list">
          <li class="ss-item ss-null" (click)="pick(null)">{{ placeholder }}</li>
          <li class="ss-item" *ngFor="let item of filtered" (click)="pick(item)">{{ getLabel(item) }}</li>
          <li class="ss-item ss-empty" *ngIf="filtered.length === 0">Aucun résultat</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .ss-wrap { position: relative; }
    .ss-display { display: flex; justify-content: space-between; align-items: center; cursor: pointer; user-select: none; }
    .ss-placeholder { color: #6c757d; }
    .ss-caret { font-size: 10px; color: #6c757d; }
    .ss-panel { position: absolute; z-index: 1050; width: 100%; background: #fff;
      border: 1px solid #ced4da; border-top: none; border-radius: 0 0 4px 4px;
      box-shadow: 0 4px 12px rgba(0,0,0,.12); }
    .ss-search { border-radius: 0; border-left: none; border-right: none; border-top: none; }
    .ss-list { list-style: none; margin: 0; padding: 0; max-height: 220px; overflow-y: auto; }
    .ss-item { padding: 8px 12px; cursor: pointer; }
    .ss-item:hover { background: #f0f4ff; }
    .ss-null { color: #6c757d; border-bottom: 1px solid #f0f0f0; }
    .ss-empty { color: #aaa; cursor: default; }
  `],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SearchableSelectComponent), multi: true }]
})
export class SearchableSelectComponent implements ControlValueAccessor, OnChanges {
  @Input() placeholder = 'Sélectionner...';
  @Input() bindLabel = 'name';
  @Input() labelFn: (item: any) => string;

  private _items: any[] = [];
  @Input() set items(v: any[]) { this._items = v || []; this.filter(); }
  get items() { return this._items; }

  searchTerm = '';
  isOpen = false;
  filtered: any[] = [];
  selectedItem: any = null;

  private onChange: (v: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {}

  @HostListener('document:click', ['$event'])
  onOutsideClick(e: MouseEvent) {
    if (!this.el.nativeElement.contains(e.target)) { this.isOpen = false; }
  }

  ngOnChanges() { this.filter(); }

  toggle() { this.isOpen = !this.isOpen; if (this.isOpen) { this.searchTerm = ''; this.filter(); } this.onTouched(); }

  filter() {
    const t = this.searchTerm.toLowerCase();
    this.filtered = this._items.filter(i => this.getLabel(i).toLowerCase().includes(t));
  }

  getLabel(item: any): string {
    if (!item) return '';
    if (this.labelFn) return this.labelFn(item);
    return item[this.bindLabel] ?? String(item);
  }

  pick(item: any) { this.selectedItem = item; this.onChange(item); this.isOpen = false; this.cdr.detectChanges(); }

  writeValue(v: any) { this.selectedItem = v; this.cdr.detectChanges(); }
  registerOnChange(fn: any) { this.onChange = fn; }
  registerOnTouched(fn: any) { this.onTouched = fn; }
  setDisabledState() {}
}
