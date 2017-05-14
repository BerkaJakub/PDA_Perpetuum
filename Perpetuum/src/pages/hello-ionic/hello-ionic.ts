import { Component } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  questions: FirebaseObjectObservable<any>;
  questionsAnswered: FirebaseListObservable<any>;
  questionsFlags: Array<{id: number, flag: boolean}>;
  questionsArray: Array<{ id: number, title: string, numAnswers: string, dateTo: string, dateFrom: string, creatorID: number, categoryID: number, likes: number, dislikes: number, answers: any, answersNumbers: any }>;
  counter: number;
  questionToDisplay: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, angFire: AngularFire) {
    this.questions = angFire.database.object('/question');
    this.questionsAnswered = angFire.database.list('/users/' + 0 + '/questionsAnswered/');
    this.questionsFlags = [];
    this.counter = 0;
    this.questionsAnswered.subscribe(questionsAnswered =>{
      questionsAnswered.forEach(q => {
        console.log(q.$key);
        console.log(q.$value);
        this.questionsFlags.push({
          id: q.$key,
          flag: q.$value
        });
      });
        
    });

    this.questionsArray = [];

    this.questions.subscribe(items => {
      items.forEach(item => {
          this.questionsArray.push({
            id: item.id,
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
      });
    });

    
    console.log(this.questionsArray);
    console.log(this.counter);
  }
  
  increment(){
    
    if(this.counter == this.questionsArray.length-1){
      this.counter = 0;
    }else{
      this.counter++;
    }
    
    console.log(this.counter);
  }

  
  
}
