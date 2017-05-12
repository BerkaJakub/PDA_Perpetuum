import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

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
  questionList: FirebaseListObservable<any>;
  answerList = ['Odpověď 1', 'Odpověď 2', 'Odpověď 3', 'Odpověď 4'];

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
    this.questionList = af.database.list('/questions');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionCreate');
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  createQuestion(name, answerList, fromDate, toDate){
    this.questionList.push(
      {
        creatorID: 1,
        name: name,
        answerList: answerList,
        fromDate: fromDate,
        toDate: toDate
      }).then( newQuestion =>{
        this.navCtrl.pop();
      }, error => {
        console.log(error);
      });
    
  }

}
