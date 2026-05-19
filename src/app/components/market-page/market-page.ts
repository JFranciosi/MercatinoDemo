import { Component, OnInit } from '@angular/core';
import { MarketService } from '../../services/market-service';
import { Market, MarketTheme } from '../../types/Market';
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-market-page',
  imports: [RouterLink, FormsModule],
  templateUrl: './market-page.html',
  styleUrl: './market-page.css',
})
export class MarketPage implements OnInit {
  markets: Market[] = [];
  id: number | undefined;

  // Pagination state
  currentPage: number = 0;
  pageSize: number = 6;
  totalPages: number = 0;
  totalElements: number = 0;

  newMarket: Omit<Market, 'id'> = {
    title: '',
    description: '',
    createdAt: new Date().toISOString().slice(0, 16),
    square: '',
    theme: undefined as unknown as MarketTheme,
    totalDesks: 0,
    assignedDesks: 0
  };

  constructor(private marketService: MarketService) { }

  async ngOnInit() {
    await this.loadMarkets();
  }

  async loadMarkets() {
    try {
      const response = await this.marketService.getMarkets(this.currentPage, this.pageSize);
      this.markets = response.content;
      this.totalPages = response.totalPages;
      this.totalElements = response.totalElements;
    } catch (error) {
      console.error('Errore durante il recupero dei mercati:', error);
    }
  }

  async goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      await this.loadMarkets();
    }
  }

  async nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      await this.loadMarkets();
    }
  }

  async prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      await this.loadMarkets();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 0; i < this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  async addMarket() {
    try {
      const created = await this.marketService.createMarket(this.newMarket as Market);
      this.currentPage = 0; // Go to first page to see the new market
      await this.loadMarkets();
      this.newMarket = {
        title: '',
        description: '',
        createdAt: new Date().toISOString().slice(0, 16),
        square: '',
        theme: undefined as unknown as MarketTheme,
        totalDesks: 0,
        assignedDesks: 0
      };
    } catch (error) {
      console.error('Errore durante il salvataggio del mercatino:', error);
    }
  }
}
