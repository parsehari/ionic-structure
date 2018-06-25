import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { ServiceProvider } from '../../providers/service/service';
import { CommonProvider } from '../../providers/common/common';
import { DashboardPage } from '../dashboard/dashboard';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  isLoggedIn: boolean = false;
  users: any = [];

  constructor(public navCtrl: NavController,
    private fb: Facebook,
    public serviceProvider: ServiceProvider,
    public commonProvide: CommonProvider
  ) {
    fb.getLoginStatus().then(res => {
      console.log(res.status);
      if (res.status === "connect") {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
      .catch(e => console.log(e));
  }

  login() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if (res.status === "connected") {
          this.isLoggedIn = true;
          this.getUserDetail(res.authResponse.userID);
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  getUserDetail(userid) {
    this.commonProvide.showLoader();
    this.fb.api("/" + userid + "/?fields=id,email,name,picture,gender", ["public_profile"])
      .then(res => {
        console.log(res);
        this.users = res;
        console.log('this.users ', this.users);
        this.commonProvide.hideLoader();
        this.navCtrl.setRoot(DashboardPage, { data: this.users });
        // this.navCtrl.push(DashboardPage, { data: this.users });
      })
      .catch(e => {
        console.log(e);
      });
  }

  getProducts() {
    this.serviceProvider.getService('/products').subscribe((response: any) => {
      console.log("response ", response);
    },
      (err) => {
        this.commonProvide.showToast(err.message);
      });
  }

  addProducts() {
    var data = {
      "id": 15,
      "name": "Product152",
      "cost": 20,
      "quantity": 2000,
      "locationId": 1,
      "familyId": 2
    };

    this.serviceProvider.postService('/products', data).subscribe((response: any) => {
      console.log("response ", response);
    },
      (err) => {
        this.commonProvide.showToast(err.message);
      });
  }

// Call alert function.
  // this.commonProvider.Alert.confirm('Sure you want to delete ').then((res) => {
  //     //this.photos.splice(index, 1);        console.log('confirmed');
  // }, err => {
  //     console.log('user cancelled');
  // });




}
