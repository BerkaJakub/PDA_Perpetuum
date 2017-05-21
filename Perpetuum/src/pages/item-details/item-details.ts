import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { NavController, NavParams } from 'ionic-angular';







@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;
  categories: FirebaseObjectObservable<any>;
  category: string;
  users: FirebaseObjectObservable<any>;
  userName: string;
  statistics: Array<{ title: string, count: number }>;

  constructor(public navCtrl: NavController, public navParams: NavParams, angFire: AngularFire) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('q');
    this.categories = angFire.database.object('/categories');
    this.users = angFire.database.object('/users');
    console.log(this.selectedItem.answers);
    console.log(this.selectedItem.answersNumbers);
    this.users.subscribe(users => {
      // items is an array
      users.forEach(user => {
        if (user.userID == this.selectedItem.creatorID) { // podminka kdyz je otazka moje, id uzivatele je 0
          this.userName = user.name;
        }
      });

    });


    this.categories.subscribe(categories => {
      // items is an array
      categories.forEach(category => {
        if (category.ID == this.selectedItem.categoryID) { // podminka kdyz je otazka moje, id uzivatele je 0
          this.category = category.title;
        }
      });
    });
    this.statistics = [];

    this.selectedItem.answers.forEach((name, i) => {
      this.statistics.push({ title: name, count: this.selectedItem.answersNumbers[i] });
    });

    console.log(this.statistics);
  }




}
