import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/compat/auth';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afs: AngularFireAuth, private router: Router) { }

  signInWithGoogle(){
    return this.afs.signInWithPopup(new GoogleAuthProvider());
  }
}
