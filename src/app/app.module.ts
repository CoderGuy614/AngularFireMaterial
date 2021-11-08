import { EffectsModule } from '@ngrx/effects';
import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';

import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { ProfileDropdownComponent } from './components/navbar/profile-dropdown/profile-dropdown.component';

//App Components
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';

//Pages
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page.component';

//Modals
import { EditDisplayNameModalComponent } from './components/edit-display-name-modal/edit-display-name-modal.component';
import { EditPhotoURLModalComponent } from './components/edit-photo-url-modal/edit-photo-url-modal.component';

import { reducers, metaReducers } from './reducers';
import { PERSISTENCE } from '@angular/fire/auth';
import { MaterialModule } from './material.module';
import { routes } from './shared/appRoutes';

@NgModule({
  declarations: [
    AppComponent, 
    DatePickerComponent,
    HomeComponent, 
    NavbarComponent,
    ProfileDropdownComponent,
    ProductComponent,
    ProductDetailComponent,
    ProductsPageComponent,
    ProductDetailPageComponent,
    EditDisplayNameModalComponent,
    EditPhotoURLModalComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    AuthModule.forRoot(),
    EffectsModule.forRoot(),
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal,
    }),
  ],
  providers: [
    { provide: PERSISTENCE, useValue: 'local' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
