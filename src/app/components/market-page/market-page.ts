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

  // Edit state
  editingMarketId: number | null = null;
  editingMarket: Market | null = null;

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

  startEdit(market: Market) {
    this.editingMarketId = market.id;
    this.editingMarket = { ...market };
  }

  cancelEdit() {
    this.editingMarketId = null;
    this.editingMarket = null;
  }

  async saveEdit() {
    if (!this.editingMarket || this.editingMarketId === null) return;
    try {
      await this.marketService.updateMarket(this.editingMarketId, this.editingMarket);
      await this.loadMarkets();
      this.cancelEdit();
    } catch (error) {
      console.error('Errore durante l\'aggiornamento del mercatino:', error);
    }
  }

  async deleteMarket(id: number) {
    if (confirm('Sei sicuro di voler eliminare questo mercatino?')) {
      try {
        await this.marketService.deleteMarket(id);
        if (this.markets.length === 1 && this.currentPage > 0) {
          this.currentPage--;
        }
        await this.loadMarkets();
      } catch (error) {
        console.error('Errore durante l\'eliminazione del mercatino:', error);
      }
    }
  }
}
