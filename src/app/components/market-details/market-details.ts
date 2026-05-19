import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MarketService } from '../../services/market-service';
import { Market } from '../../types/Market';

@Component({
  selector: 'app-market-details',
  imports: [RouterLink, DatePipe],
  templateUrl: './market-details.html',
  styleUrl: './market-details.css',
})
export class MarketDetails implements OnInit {
  market: Market | undefined;

  constructor(
    private route: ActivatedRoute,
    private marketService: MarketService
  ) { }

  async ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = parseInt(idParam, 10);
      try {
        this.market = await this.marketService.getMarketsDetails(id);
      } catch (error) {
        console.error('Errore durante il recupero del mercatino:', error);
      }
    }
  }
}
