import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { ItemDetailsPage } from '../item-details/item-details';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';


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
          Object.keys(items).forEach(key => {
            if (items[key].id == fav.$value) { // hodnota z uzivatelskeho favorites se musi rovna id otazky
              this.questionTitles.push({
                title: items[key].title,
                numAnswers: items[key].numAnswers,
                dateTo: items[key].dateTo,
                dateFrom: items[key].dateFrom,
                creatorID: items[key].creatorID,
                categoryID: items[key].categoryID,
                likes: items[key].likes,
                dislikes: items[key].dislikes,
                answers: items[key].answers,
                answersNumbers: items[key].answersNumbers
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

   goBack() {
    this.navCtrl.setRoot(HelloIonicPage);
    this.navCtrl.popToRoot();
  }

}
