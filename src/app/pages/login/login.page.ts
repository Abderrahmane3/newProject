    import { Component, OnInit, ViewChild } from '@angular/core';
    import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
    import { User } from 'src/app/interfaces/user';
    import { AuthService } from 'src/app/services/auth.service';
    import { Keyboard } from '@ionic-native/keyboard/ngx';
    import { AlertController } from '@ionic/angular'
    import { Router } from '@angular/router'


    @Component({
      selector: 'app-login',
      templateUrl: './login.page.html',
      styleUrls: ['./login.page.scss'],
    })
    export class LoginPage implements OnInit {
      @ViewChild(IonSlides) slides: IonSlides;
      public wavesPosition: number = 0;
      private wavesDifference: number = 100;
      public userLogin: User = {};
      public userRegister: User = {};
      private loading: any;

      constructor(
        private authService: AuthService,
        private loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
        public alertController: AlertController,
        public router: Router,
        public keyboard: Keyboard
      ) { }

      ngOnInit() { }


      segmentChanged(event: any) {
        if (event.detail.value === 'login') {
          this.slides.slidePrev();
          this.wavesPosition += this.wavesDifference;
        } else {
          this.slides.slideNext();
          this.wavesPosition -= this.wavesDifference;
        }
      }

      async presentAlert(title: string, content: string) {
        const alert = await this.alertController.create({
          header: title,
          message: content,
          buttons: ['OK']
        })

        await alert.present()
      }


      
      async login() {
      await this.presentLoading();

        try {

        if(await this.authService.login(this.userLogin)){

          
            this.router.navigateByUrl("/app/tabs/traveaux");
        }
          
        } catch (error) {
      this.presentToast(error.message);
        } finally {
      this.loading.dismiss();
        }
      }
      
      

        async register() {
            await this.presentLoading();

          try {
            
            if (await this.authService.register(this.userRegister)){
          this.presentAlert('Success', 'You are registered!')
              this.router.navigateByUrl("/app/tabs/traveaux");
            }

          

        
        } catch (error) {
          this.presentToast(error.message);
        } finally {
          this.loading.dismiss();
        }
      }

        async presentLoading() {
          this.loading = await this.loadingCtrl.create({ message: 'Att SVP...' });
          return this.loading.present();
        }

        async presentToast(message: string) {
          const toast = await this.toastCtrl.create({ message, duration: 2000 });
          toast.present();
        }
      }


