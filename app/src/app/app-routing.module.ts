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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'customer-list', component: CilenteListComponent },
  { path: 'create-customer', component: ClienteNewComponent },
  { path: 'create-customer/:id', component: ClienteNewComponent },

  { path: 'store-list', component: StoreListComponent },
  { path: 'create-store', component: CreateStoreComponent },
  { path: 'create-store/:id', component: CreateStoreComponent },


  { path: 'articles-list', component: ArticleListComponent },
  { path: 'create-article', component: CreateArticleComponent },
  { path: 'edit-article/:id', component: CreateArticleComponent },


  { path: 'market', component: MarketComponent },
  { path: 'cart', component: CartComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
