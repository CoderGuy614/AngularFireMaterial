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

  // getProfiles(email): Observable<Profile[]> {
  //   this.profiles = this.afs
  //     .collection('profiles', (ref) => ref.where('email', '==', email))
  //     .snapshotChanges()
  //     .pipe(
  //       map((actions) =>
  //         actions.map((a) => {
  //           const data = a.payload.doc.data() as Profile;
  //           return data;
  //         })
  //       )
  //     );

  //   return this.profiles;
  // }

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

// Try getting the Profile ID First, then fetching the profile by it's ID
