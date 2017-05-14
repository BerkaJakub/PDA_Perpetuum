import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { ItemDetailsPage } from '../item-details/item-details';



@Component({
  selector: 'page-favouritelist',
  templateUrl: 'favouritelist.html',
})
export class Favouritelist {

  questions: FirebaseObjectObservable<any>;
  favorites: FirebaseListObservable<any>;
  questionTitles: Array<{ title: string, numAnswers: string, dateTo: string, dateFrom: string, creatorID: number, categoryID: number, likes: number, dislikes: number, answers: any, answersNumbers: any }>;

  constructor(public navCtrl: NavController, public navParams: NavParams, angFire: AngularFire) {
    this.questions = angFire.database.object('/question');
    let uid = 0;
    this.favorites = angFire.database.list('/users/' + uid + '/favQuestions/');
    this.questionTitles = [];

    this.favorites.subscribe(favorites => {
      favorites.forEach(fav => {
        console.log(fav.$value);

        this.questions.subscribe(items => {
          // items is an array
          items.forEach(item => {
            if (item.id == fav.$value) { // hodnota z uzivatelskeho favorites se musi rovna id otazky
              this.questionTitles.push({
                title: item.title,
                numAnswers: item.numAnswers,
                dateTo: item.dateTo,
                dateFrom: item.dateFrom,
                creatorID: item.creatorID,
                categoryID: item.categoryID,
                likes: item.likes,
                dislikes: item.dislikes,
                answers: item.answers,
                answersNumbers: item.answersNumbers
              });
            }
          });

        });

      });
    });




    console.log(this.favorites);


  }

  itemTapped(event, q) {
    this.navCtrl.push(ItemDetailsPage, {
      q: q
    });
  }

}
