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

export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
}