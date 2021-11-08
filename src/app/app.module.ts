import { EffectsModule } from '@ngrx/effects';
import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
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

//Auth Components
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileDropdownComponent } from './components/navbar/profile-dropdown/profile-dropdown.component';

//App Components
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductComponent } from './components/product/product.component';

//Pages
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';

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
    HomeComponent, 
    NavbarComponent,
    ProfileComponent,
    ProfilePageComponent,
    ProfileDropdownComponent,
    ProductComponent,
    ProductsPageComponent,
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
