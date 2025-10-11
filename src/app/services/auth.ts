import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  
  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  async register(userData: any, password: string) {
    const userCredential = await this.afAuth.createUserWithEmailAndPassword(userData.email, password);
    const uid = userCredential.user?.uid;

    if (uid) {
      await this.firestore.collection('users').doc(uid).set({
        uid,
        name: userData.name,
        lastName: userData.lastName,
        birthDate: userData.birthDate,
        country: userData.country,
        city: userData.city,
        gender: userData.gender,
        showGenderProfile: userData.showGenderProfile,
        passions: userData.passions,
        photos: userData.photos,
        email: userData.email
      });
    }

    return userCredential;
  }

  async login(email: string, password: string) {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }
  
  async logout() {
    return await this.afAuth.signOut();
  }

  getUser() {
    return this.afAuth.authState;
  }
}
