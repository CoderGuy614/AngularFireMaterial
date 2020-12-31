import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Profile } from '../models/Profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  profilesCollection: AngularFirestoreCollection<Profile>;
  profileDoc: AngularFirestoreDocument<Profile>;
  profiles: Observable<Profile[]>;
  profile: Observable<any>;
  constructor(private afs: AngularFirestore) {}

  getProfiles(email): Observable<Profile[]> {
    this.profiles = this.afs
      .collection('profiles', (ref) => ref.where('email', '==', email))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Profile;
            // data.id = a.payload.doc.id;
            return data;
          })
        )
      );

    return this.profiles;
  }

  // getProfile(email: string): Observable<Profile> {
  //   this.afs.collection('profiles', (ref) => ref.where('email', '==', email));
  // }
}
