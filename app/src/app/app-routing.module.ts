import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CilenteListComponent } from './core/clientes/list/list.component';
import { StoreListComponent } from './core/store/list/list.component';
import { CreateStoreComponent } from './core/store/new/new.component';
import { ArticleListComponent } from './core/articles/list/list.component';
import { CreateArticleComponent } from './core/articles/new/new.component';
import { MarketComponent } from './core/market/market.component';
import { CartComponent } from './core/cart/cart.component';
import { ClienteNewComponent } from './core/clientes/new/new.component';
import { UserNewComponent } from './core/usuarios/new/new.component';
import { UserListComponent } from './core/usuarios/list/list.component';
import { authGuard } from './guard/auth.guard';
import { RolEnum } from './models/enums/role-enum';
import { ListComprasComponent } from './core/rel-cliente-articulo/list/list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },

  //Admin
  { path: 'customer-list', component: CilenteListComponent, canActivate: [authGuard], data: { rolPermitidos: [RolEnum.Administrador] } },
  { path: 'create-customer', component: ClienteNewComponent, canActivate: [authGuard], data: { rolPermitidos: [RolEnum.Administrador] } },
  { path: 'create-customer/:id', component: ClienteNewComponent, canActivate: [authGuard], data: { rolPermitidos: [RolEnum.Administrador] } },

  { path: 'store-list', component: StoreListComponent, canActivate: [authGuard], data: { rolPermitidos: [RolEnum.Administrador] } },
  { path: 'create-store', component: CreateStoreComponent, canActivate: [authGuard], data: { rolPermitidos: [RolEnum.Administrador] } },
  { path: 'create-store/:id', component: CreateStoreComponent, canActivate: [authGuard], data: { rolPermitidos: [RolEnum.Administrador] } },


  { path: 'articles-list', component: ArticleListComponent, canActivate: [authGuard], data: { rolPermitidos: [RolEnum.Administrador] } },
  { path: 'create-article', component: CreateArticleComponent, canActivate: [authGuard], data: { rolPermitidos: [RolEnum.Administrador] } },
  { path: 'edit-article/:id', component: CreateArticleComponent, canActivate: [authGuard], data: { rolPermitidos: [RolEnum.Administrador] } },

  { path: 'usuarios', component: UserListComponent, canActivate: [authGuard], data: { rolPermitidos: [RolEnum.Administrador] } },
  { path: 'compras', component: ListComprasComponent, canActivate: [authGuard], data: { rolPermitidos: [RolEnum.Administrador] } },

  { path: 'usuario-nuevo', component: UserNewComponent, canActivate: [authGuard], data: { rolPermitidos: [RolEnum.Administrador] } },
  { path: 'usuario-edicion/:id', component: UserNewComponent, canActivate: [authGuard], data: { rolPermitidos: [RolEnum.Administrador] } },

  //Cliente
  { path: 'market', component: MarketComponent },
  { path: 'cart', component: CartComponent },


  { path: '', redirectTo: '/home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
