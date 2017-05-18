import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

/**
 * Generated class for the Category page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class Category{
  categories: FirebaseObjectObservable<any>;
  userCategories: FirebaseObjectObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public angFire: AngularFire) {
    this.categories = angFire.database.object('/categories');
    this.userCategories = angFire.database.object('/users/'+ 0 + '/categoryFilter/');


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Category');
  }

}
