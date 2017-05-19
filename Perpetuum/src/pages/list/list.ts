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


  questions: FirebaseObjectObservable<any>;
  questionTitles: Array<{ title: string, numAnswers: string, dateTo: string, dateFrom: string, creatorID: number, categoryID: number, likes: number, dislikes: number, answers: any, answersNumbers: any }>;

  constructor(public navCtrl: NavController, public navParams: NavParams, angFire: AngularFire) {
    this.questions = angFire.database.object('/question');

    this.questionTitles = [];

    this.questions.subscribe(items => {
      // items is an array

     
    Object.keys(items).forEach(key => {
        if (items[key].creatorID == 0) { // podminka kdyz je otazka moje, id uzivatele je 0
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
