import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import jwt_decode from "jwt-decode";

export const authGuard: CanActivateFn = (route, state) => {

  const router = Inject(Router);

  const token = localStorage.getItem('token');
  if (token && !isTokenExpired(token)) {
    const roleId = localStorage.getItem('roleId')
    const rol = route.data['rolPermitidos'];
    let isRolAccepted = rol.includes(roleId)
    console.log(isRolAccepted)
    return isRolAccepted;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

function isTokenExpired(token: string): boolean {
  try {
    const decodedToken: any = jwt_decode(token);
    const expirationTime = decodedToken.exp * 1000; // Convertir a milisegundos
    const currentTime = Date.now();
    return expirationTime < currentTime;
  } catch (error) {
    // Si hay algún error al decodificar el token, asumimos que ha expirado
    return true;
  }
}
