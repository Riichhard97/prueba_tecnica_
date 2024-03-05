export interface RelClienteArticulo {
    id: string;
    clienteId: string;
    articuloId: string;
    cliente?: string;
    articulo?: string;
    cantidad: number;
    fecha: Date;
}
