export interface CartItem {
    id: string;
    codigo: string;
    descripcion: string;
    precio: number;
    image: string;
    stock: number;
    cantidad: number;
    tiendaId: string;
    tienda: string;
}
