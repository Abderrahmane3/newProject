import { Component } from '@angular/core';
import * as firebase from "firebase/app";
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public isAdmin = false;
   constructor(
               public afa: AngularFirestore,
               public afAuth: AngularFireAuth){}


   ngOnInit() { 

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
      firebase
      .firestore()
      .doc(`/users/${user.uid}`)
      .get()
      .then(usersSnapshot =>{
      this.isAdmin = usersSnapshot.data().isAdmin;
      })
      }
      })





   }




}
