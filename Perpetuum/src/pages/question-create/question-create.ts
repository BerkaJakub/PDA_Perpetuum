import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
/**
 * Generated class for the QuestionCreate page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-question-create',
  templateUrl: 'question-create.html',
})
export class QuestionCreate {
  questions: FirebaseObjectObservable<any>;
  answerList = ['Odpověď 1', 'Odpověď 2', 'Odpověď 3', 'Odpověď 4'];

  constructor(public navCtrl: NavController, public navParams: NavParams, public angFire: AngularFire) {
    this.questions = angFire.database.object('/question');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionCreate');
  }


  addAnswer(){
    this.answerList.push("Další odpověď");
  }
  deleteAnswer(){
    this.answerList.pop();
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  createQuestion(title, answerList, fromDate, toDate){
    console.log(title);
    console.log(answerList);
    let ansNumbers = {};
    answerList.forEach((value, index) => {
      ansNumbers[index] = 0;
    });
    console.log(fromDate);
    console.log(toDate);
    let key = this.questions.$ref.push().key;
    console.log(key);
    let newQuestion = {
      title: title,
      answers: answerList,
      answersNumbers: ansNumbers,
      creatorID: 0,
      dateFrom: fromDate,
      dateTo: toDate,
      likes: 0,
      dislikes: 0,
      numAnswers: 0,
      categoryID: 0,
      id: key,
      userAnswered: null
    }

    console.log(newQuestion);
    this.questions.$ref.child(key).set(newQuestion);
    this.navCtrl.pop();

  }

}