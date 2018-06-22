import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController} from 'ionic-angular';
import { Network } from '@ionic-native/network';
/*
  Generated class for the CommonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonProvider {

  loader: any;
  toaster: any;
  loading: any = false;
  isOnline: boolean = true;

  constructor(public http: HttpClient,
              public loadingCtrl: LoadingController,
              public toast: ToastController,
              public alertCtrl: AlertController,
              public network: Network
            ) {

    console.log('Hello CommonProvider Provider');
    this.network.onConnect().subscribe(data => {
        console.log('network info ' ,data);
        this.displayNetworkUpdate(data.type);
    }, (error) => {
        console.log('network info ' ,error.message)
    });

    this.network.onDisconnect().subscribe(data => {
        console.log('network info ' ,data);
        this.displayNetworkUpdate(data.type);
    }, (error) => {
        console.log('network info ' ,error.message)
    });

  }

  showLoader(msg?) {
    //this.loading is important to start the loader before outside function make **** loading: any = false; ****
    console.log('this.loading P',this.loading);
    if(!this.loading){
      this.loader = this.loadingCtrl.create({
          content: msg || ''
      });
      this.loading = true;
      this.loader.present();
    }else{
      console.log("trying to calling loader two times");
    }
  }

  hideLoader() {
  console.log('this.loading D',this.loading);
    if(this.loading){
      this.loader.dismiss();
      this.loading = false;
    }else{
      console.log("trying to dismiss loader two times");
    }
  }

  showToast(msg, time?) {
      this.toaster = this.toast.create({
          message: msg,
          duration: time||8000,
          position: 'bottom'
      });
      this.toaster.onDidDismiss(() => {
          console.log('Dismissed toast');
      });
      this.toaster.present()
  }

  public Alert = {
      confirm: (msg?, title?) => {
          return new Promise((resolve, reject) => {
              let alert = this.alertCtrl.create({
                  title: title || 'Confirm',
                  message: msg || 'Do you want continue?',
                  buttons: [
                      {
                          text: 'Cancel',
                          role: 'cancel',
                          handler: () => {
                              reject(false);
                          }
                      },
                      {
                          text: 'Ok',
                          handler: () => {
                              resolve(true);
                          }
                      }
                  ]
              });
              alert.present();
          });

      },
      alert: (msg, title?) => {
          let alert = this.alertCtrl.create({
              title: title || 'Alert',
              subTitle: msg,
              buttons: ['Dismiss']
          });
          alert.present();
      }
  };

  // checkInternetConnection() {
  //     console.log("checking network...", this.network.type);
  //     this.network.onConnect().subscribe(data => {
  //         console.log(data);
  //         this.displayNetworkUpdate(data.type);
  //     }, error => console.error(error));
  //
  //     this.network.onDisconnect().subscribe(data => {
  //         console.log(data);
  //         this.displayNetworkUpdate(data.type);
  //     }, error => console.error(error));  // }

  displayNetworkUpdate(connectionState: string) {
      let networkType = this.network.type;
      if (connectionState == 'online') {
          this.isOnline = true;
      } else {
          this.isOnline = false;
      }
      // this.showToast(`You are now ${connectionState} via ${networkType}`);
      this.showToast('You are now '+connectionState, 2500);
  }

}
