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
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductComponent } from './components/product/product.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';

//Pages
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page.component';

//Modals
import { EditDisplayNameModalComponent } from './components/edit-display-name-modal/edit-display-name-modal.component';
import { EditPhotoURLModalComponent } from './components/edit-photo-url-modal/edit-photo-url-modal.component';
import { BookingConfirmationModalComponent } from './components/booking-confirmation-modal/booking-confirmation-modal.component';

//Effects
import { BookingEffects } from './pages/product-detail-page/product-detail-page.effects';

//Full Calendar
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { reducers, metaReducers } from './reducers';
import { PERSISTENCE } from '@angular/fire/auth';
import { MaterialModule } from './material.module';
import { routes } from './shared/appRoutes';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { BookingsComponent } from './pages/bookings/bookings.component';

FullCalendarModule.registerPlugins([dayGridPlugin, interactionPlugin]);

@NgModule({
  declarations: [
    AppComponent,
    DatePickerComponent,
    HomeComponent,
    NavbarComponent,
    ProfileDropdownComponent,
    ProductComponent,
    BookingsComponent,
    ProductsPageComponent,
    ProductDetailPageComponent,
    EditDisplayNameModalComponent,
    EditPhotoURLModalComponent,
    BookingFormComponent,
    BookingConfirmationModalComponent,
  ],
  imports: [
    BrowserModule,
    FullCalendarModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    AuthModule.forRoot(),
    EffectsModule.forRoot([BookingEffects]),
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    StoreRouterConnectingModule.forRoot(),
    NgbModule,
  ],
  providers: [{ provide: PERSISTENCE, useValue: 'local' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
