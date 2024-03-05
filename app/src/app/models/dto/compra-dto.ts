import { Article } from "../article";

export interface CompraDetDto {
    articulo?: Article;
    articuloId: string;
    cantidad: number;
}

export interface CompraDto {
    id?: string;
    clientId: string;
    articles: CompraDetDto[];
}
