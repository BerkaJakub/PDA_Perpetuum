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
  user: FirebaseObjectObservable<any>;
  money: number;
  notEnaughMoney: boolean;
  answerList = ['Odpověď 1', 'Odpověď 2', 'Odpověď 3', 'Odpověď 4'];

  constructor(public navCtrl: NavController, public navParams: NavParams, public angFire: AngularFire) {
    this.questions = angFire.database.object('/question');
    this.user = angFire.database.object('/users/' + 0);
    this.user.subscribe(user =>{
      this.money = user.money;

    });
    
    if(this.money < 5){
      this.notEnaughMoney = true;
    }else{
      this.notEnaughMoney = false;
    }

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

    let userAnswered = {
      "0": false
    }
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
      usersAnswered: userAnswered
    }

    console.log(newQuestion);
    this.questions.$ref.child(key).set(newQuestion);
    this.money = this.money - 5;
    this.user.$ref.child("money").set(this.money);
    this.navCtrl.pop();

  }

}