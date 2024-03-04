import { Article } from "./article";

export interface Store {
    id?: string;
    sucursal: string;
    direccion: string;
    lstArticulos: Article[];
}
