import { Component, signal } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { MarketPage } from "./components/market-page/market-page";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MarketPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Mercartino-demo');
}
