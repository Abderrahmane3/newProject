import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/interfaces/job';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'




@Component({
  selector: 'app-travail',
  templateUrl: './travail.page.html',
  styleUrls: ['./travail.page.scss'],
})
export class TravailPage implements OnInit {
  private jobID: string = null;
  public job: Job = {};
  private loading: any;
  private jobSubscription: Subscription;

  constructor(
    private jobService: JobService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    public afa: AngularFirestore,
    public afAuth: AngularFireAuth,
    private toastCtrl: ToastController
  ) {
    this.jobID = this.activatedRoute.snapshot.params['id'];

    if (this.jobID) this.loadJob();
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.jobSubscription) this.jobSubscription.unsubscribe();
  }

  loadJob() {
    this.jobSubscription = this.jobService.getJob(this.jobID).subscribe(data => {
      this.job = data;
    });
  }/*
  .then(()=>{
    localStorage.setItem('userid',this.afAuth.auth.currentUser.uid);
    this.afAuth.auth.currentUser.updateProfile({
      displayName:this.username,
      photoURL:''
    }).then(()=>{

      this.afa.doc(`users/${this.afAuth.auth.currentUser.uid}`).set({
        username,
        email:this.userRegister.email,
        password,
        isCli
      })*/
  async addJob() {
    await this.presentLoading();

    this.job.userId = this.authService.getAuth().currentUser.uid;

    if (this.jobID) {
      try {
        await this.jobService.updateJob(this.jobID, this.job);
        await this.loading.dismiss();
        this.afa.doc(`Jobs/${this.jobID}`).set({
          title: this.job.title,
          description: this.job.description,
          picture:this.job.picture,
          location:this.job.location,
          status : false 
              })

        this.router.navigateByUrl("/app/tabs/traveaux");
      } catch (error) {
        this.presentToast('Erreur en essayant de sauvegarder');
        this.loading.dismiss();
      }
    } else {
      this.job.createdAt = new Date().getTime();

      try {
        await this.jobService.addJob(this.job);
        await this.loading.dismiss();
        

        this.router.navigateByUrl("/app/tabs/traveaux");
      } catch (error) {
        this.presentToast('Erreur en essayant de sauvegarder');
        this.loading.dismiss();
      }
    }
    
    
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Attend SVP...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}

/*Map<String, Object> map = new HashMap<>();
     map.put("yourProperty", "yourValue");
firebaseFirestore.collection("Users").document(user_id).update(map);*/