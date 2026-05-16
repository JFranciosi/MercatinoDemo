import { Routes } from '@angular/router';
import { MarketPage } from './components/market-page/market-page';
import { MarketDetails } from './components/market-details/market-details';

export const routes: Routes = [
    {
        path: 'markets',
        component: MarketPage,
        title: 'Mercatini'
    },
    {
        path: 'dettaglio-mercatino',
        title: 'Dettaglio Mercatino',
        component: MarketDetails
    },
    {
        path: '',
        redirectTo: 'markets'
    }
];
