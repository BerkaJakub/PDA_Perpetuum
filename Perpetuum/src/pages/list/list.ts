import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { ItemDetailsPage } from '../item-details/item-details';
import { QuestionCreate } from '../question-create/question-create';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  user: FirebaseObjectObservable<any>;
  questions: FirebaseListObservable<any>;
  questionTitles: Array<{ title: string, numAnswers: string, dateTo: string, dateFrom: string, creatorID: number, categoryID: number, likes: number, dislikes: number, answers: any, answersNumbers: any }>;
  money: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, angFire: AngularFire) {
    this.questions = angFire.database.list('/question');

    this.user = angFire.database.object('/users/' + 0);
    this.user.subscribe(user => {
      this.money = user.money;

    });


  }

  itemTapped(event, q) {
    this.navCtrl.push(ItemDetailsPage, {
      q: q
    });
  }

  newQuestion() {
    this.navCtrl.push(QuestionCreate);
  }

}
