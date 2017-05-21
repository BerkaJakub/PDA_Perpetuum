import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { ItemDetailsPage } from '../item-details/item-details';
import { QuestionCreate } from '../question-create/question-create';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {


  questions: FirebaseListObservable<any>;
  questionTitles: Array<{ title: string, numAnswers: string, dateTo: string, dateFrom: string, creatorID: number, categoryID: number, likes: number, dislikes: number, answers: any, answersNumbers: any }>;

  constructor(public navCtrl: NavController, public navParams: NavParams, angFire: AngularFire) {
    this.questions = angFire.database.list('/question');




  }

  itemTapped(event, q) {
    this.navCtrl.push(ItemDetailsPage, {
      q: q
    });
  }

  newQuestion() {
    this.navCtrl.push(QuestionCreate);
  }

  goBack() {
    this.navCtrl.setRoot(HelloIonicPage);
    this.navCtrl.popToRoot();
  }

}
