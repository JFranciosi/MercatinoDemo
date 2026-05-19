import { Component, OnInit } from '@angular/core';
import { MarketService } from '../../services/market-service';
import { Market } from '../../types/Market';

@Component({
  selector: 'app-market-page',
  imports: [],
  templateUrl: './market-page.html',
  styleUrl: './market-page.css',
})
export class MarketPage implements OnInit {
  markets: Market[] = [];
  constructor(private marketService: MarketService) { }
  async ngOnInit() {
    try {
      this.markets = await this.marketService.getMarkets();
    } catch (error) {
      console.error('Errore durante il recupero dei mercati:', error);
    }
  }
}
