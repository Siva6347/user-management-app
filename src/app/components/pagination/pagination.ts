import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  @Input({ transform: (value: number) => signal(value) }) currentPage = signal(1);
  @Input({ transform: (value: number) => signal(value) }) totalItems = signal(0);
  @Input({ transform: (value: number) => signal(value) }) itemsPerPage = signal(10);
  @Input({ transform: (value: number[]) => signal(value) }) pageSizes = signal([5, 10, 20, 50]);

  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();

  totalPages = computed(() => Math.ceil(this.totalItems() / this.itemsPerPage()));
  startItem = computed(() => (this.currentPage() - 1) * this.itemsPerPage() + 1);
  endItem = computed(() => Math.min(this.currentPage() * this.itemsPerPage(), this.totalItems()));

  visiblePages = computed(() => {
    const pages: number[] = [];
    const totalVisible = 5;

    let start = Math.max(1, this.currentPage() - 2);
    let end = Math.min(this.totalPages(), start + totalVisible - 1);

    if (end === this.totalPages()) {
      start = Math.max(1, end - totalVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  });

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages() && page !== this.currentPage()) {
      this.pageChange.emit(page);
    }
  }

  onItemsPerPageChange(items: number): void {
    this.itemsPerPage.set(items);
    this.itemsPerPageChange.emit(this.itemsPerPage());
  }
}
