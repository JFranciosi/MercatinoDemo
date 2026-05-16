export interface Market {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    square: string;
    theme: MarketTheme;
    totalDesks: number;
    assignedDesks: number;
}

export enum MarketTheme {
    LIBRI,
    ABBIGLIAMENTO,
    VINTAGE,
    SVUOTACANTINE
}