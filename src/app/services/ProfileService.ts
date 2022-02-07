import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Profile } from '../models/Profile';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  profilesCollection: AngularFirestoreCollection<Profile>;
  profileDoc: AngularFirestoreDocument<Profile>;
  profiles: Observable<Profile[]>;
  profile: Observable<any>;
  constructor(private afs: AngularFirestore, private store: Store<AppState>) {}

  getProfileId(email: string): Observable<string> {
    return this.afs
      .collection('profiles', (ref) => ref.where('email', '==', email))
      .get()
      .pipe(map((x) => (x.docs.length > 0 ? x.docs[0].id : null)));
  }

  getProfile(id: string) {
    return this.afs
      .collection('profiles')
      .doc(id)
      .get()
      .pipe(map((x) => x.data()));
  }
}
