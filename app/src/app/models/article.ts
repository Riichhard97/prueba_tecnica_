export interface Article {
  id?: string;
  codigo: string;
  descripcion: string;
  precio: number;
  image: string;
  stock: number;
  cantidad?: number;
}
