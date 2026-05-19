import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Market } from '../types/Market';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  private readonly apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  async getMarkets(): Promise<Market[]> {
    const response = await firstValueFrom(this.http.get<{ content: Market[] }>(this.apiUrl + '/markets'));
    return response.content;
  }

  async getMarketsDetails(id: number): Promise<Market> {
    const response = await firstValueFrom(this.http.get<{ content: Market }>(this.apiUrl + '/markets/' + id));
    return response.content;
  }

  async createMarket(market: Market): Promise<Market> {
    const response = await firstValueFrom(this.http.post<Market>(this.apiUrl + '/markets', market));
    return response;
  }

  async updateMarket(id: number, market: Market): Promise<Market> {
    const response = await firstValueFrom(this.http.put<Market>(this.apiUrl + '/markets/' + id, market));
    return response;
  }

  async deleteMarket(id: number): Promise<void> {
    await firstValueFrom(this.http.delete<void>(this.apiUrl + '/markets/' + id));
  }

}
