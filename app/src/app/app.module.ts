import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CilenteListComponent } from './core/clientes/list/list.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { StoreListComponent } from './core/store/list/list.component';
import { CreateStoreComponent } from './core/store/new/new.component';
import { ArticleListComponent } from './core/articles/list/list.component';
import { CreateArticleComponent } from './core/articles/new/new.component';
import { MarketComponent } from './core/market/market.component';
import { ArticleCardComponent } from './core/market/article-card/article-card.component';
import { CartComponent } from './core/cart/cart.component';
import { AddArticleComponent } from './core/store/components/add-article/add-article.component';
import { ModalComponent } from './components/modal/modal.component';
import { HttpClientModule } from '@angular/common/http';
import { ClienteNewComponent } from './core/clientes/new/new.component';
import { UserNewComponent } from './core/usuarios/new/new.component';
import { UserListComponent } from './core/usuarios/list/list.component';
import locale from '@angular/common/locales/es-MX';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { ListComprasComponent } from './core/rel-cliente-articulo/list/list.component';

registerLocaleData(locale, 'es');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    CilenteListComponent,
    ClienteNewComponent,
    StoreListComponent,
    CreateStoreComponent,
    ArticleListComponent,
    CreateArticleComponent,
    MarketComponent,
    ArticleCardComponent,
    CartComponent,
    AddArticleComponent,
    ModalComponent,
    UserNewComponent,
    UserListComponent,
    ListComprasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-MX' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
