import { Observable } from 'rxjs';
import { tap, map, first, take } from 'rxjs/operators';
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
            return data;
          })
        )
      );

    return this.profiles;
  }

  getProfileId(email) {
    return this.afs
      .collection('profiles', (ref) => ref.where('email', '==', email))
      .get()
      .pipe(map((x) => x.docs[0].id));
  }

  // getProfile(email: string): Observable<Profile> {
  //   this.profile = this.afs.collection('profiles', ref => ref.where('email', '==', email).limit(1)).snapshotChanges().pipe(
  //     map((actions) => {
  //       if (actions.payload.exists === false) {
  //         return null;
  //       } else {
  //         const data = action.payload.data() as Client;
  //         data.id = action.payload.id;
  //         return data;
  //       }
  //     })
  //   );
  //   return this.client;
  // }

  // getProfile(email: string): Observable<Profile> {
  //   this.afs.collection('profiles', (ref) => ref.where('email', '==', email));
  // }
}

// Try getting the Profile ID First, then fetching the profile by it's ID
