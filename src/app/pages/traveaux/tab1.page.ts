import { Component, OnInit  } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { JobService } from 'src/app/services/job.service';
import { Job } from 'src/app/interfaces/job';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})




          export class Tab1Page implements OnInit {
            private loading: any;
            public jobs = new Array<Job>();

            private jobsSubscription: Subscription;
             status = false;
            nbr : string;

            constructor(
              private loadingCtrl: LoadingController,
              private jobService: JobService,
              private toastCtrl: ToastController
                ) {
              this.jobsSubscription = this.jobService.getJobs().subscribe(data => {
                this.jobs = data;
              });
              
              
            }


            ngOnInit() { 
            
            
            }
            ionViewWillEnter(){
              this.nbr = '1';
            }

            ngOnDestroy() {
              this.jobsSubscription.unsubscribe();
            }

            

            async presentLoading() {
              this.loading = await this.loadingCtrl.create({ message: 'Attend SVP...' });
              return this.loading.present();
            }

            async deleteJob(id: string) {
              try {
                await this.jobService.deleteJob(id);
              } catch (error) {
                this.presentToast('Erreur lors de la tentative de suppression');
              }
            }

            async presentToast(message: string) {
              const toast = await this.toastCtrl.create({ message, duration: 2000 });
              toast.present();
            }

              
            async approveJob(id: string){
                        try{
                          await this.jobService.approveJob(id);

                        }catch(error){
                          console.dir(error);
                        }
                      }

  /*public isAdmin = false;
    public isCl = false;
    

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

   
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
      firebase
      .firestore()
      .doc(`/users/${user.uid}`)
      .get()
      .then(usersSnapshot =>{
      this.isCl = usersSnapshot.data().isCl;
      })
      }
      })
    }


*/

   }

   
  




  



