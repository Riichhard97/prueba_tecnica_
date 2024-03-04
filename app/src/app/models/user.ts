export interface User {
    id?: string;
    nombreUsuario: string;
    correo: string;
    clienteId: string;
    roleId: string;
    fechaUltimoAcceso?: Date;
    password?: string;

    cliente?: string;
    rol?: string;
}
