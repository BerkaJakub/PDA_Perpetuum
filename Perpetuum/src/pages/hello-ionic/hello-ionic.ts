import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  questions: FirebaseObjectObservable<any>;
  answers: FirebaseObjectObservable<any>;
  answersArray: Array<string>;
  answer: FirebaseObjectObservable<any>;

  questionsAnswered: FirebaseListObservable<any>;
  questionsFlags: Array<{ id: number, flag: boolean }>;
  questionsArray: Array<{ id: number, title: string, numAnswers: string, dateTo: string, dateFrom: string, creatorID: number, categoryID: number, likes: number, dislikes: number, answers: any, answersNumbers: any }>;
  counter: number;
  questionToDisplay: Array<{ id: number, title: string, numAnswers: string, dateTo: string, dateFrom: string, creatorID: number, categoryID: number, likes: number, dislikes: number, answers: any, answersNumbers: any }>;
  question: any;

  title: string;
  likes: number;
  dislikes: number;


  constructor(public navCtrl: NavController, public navParams: NavParams, public angFire: AngularFire) {
    
    this.counter = 0;
    //this.questions = angFire.database.object('/question');
    //this.questionsAnswered = angFire.database.list('/users/' + 0 + '/questionsAnswered/');
    //this.questionsFlags = [];
    this.questions = angFire.database.object('/question/' + this.counter);
    this.questions.subscribe(question => {
      this.title = question.title;
      this.likes = question.likes;
      this.dislikes = question.dislikes;
    })
    
    this.answers = angFire.database.object('/question/' + this.counter + '/answers/');
    
   /* this.questionsAnswered.subscribe(questionsAnswered => {
      questionsAnswered.forEach(q => {
        console.log(q.$key);
        console.log(q.$value);
        this.questionsFlags.push({
          id: q.$key,
          flag: q.$value
        });
      });

    });
    this.question = {};
    this.questionsArray = [];
    this.questionToDisplay = [];
    this.answersToDisplay = [];
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

        if (item.id == 0) {
          this.questionToDisplay.push({
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
          
              this.answersToDisplay = item.answers;
          
          
        }

      });
    });
*/
   // console.log(this.answersToDisplay);
   // console.log(this.questionToDisplay);
    
  }



  increment() {

    if (this.counter == 1) {
      this.counter = 0;
    } else {
      this.counter++;
    }
    this.questions = this.angFire.database.object('/question/' + this.counter);
    this.questions.subscribe(question => {
      this.title = question.title;
      this.likes = question.likes;
      this.dislikes = question.dislikes;
    });

    this.answers = this.angFire.database.object('/question/' + this.counter + '/answers/');
    console.log(this.counter);
    //this.questionToDisplay = this.findQuestionById(this.counter);
    //this.answersToDisplay = this.questionToDisplay[0].answers;
    //console.log(this.answersToDisplay);
  }

  findQuestionById(id) {
    return this.questionsArray.filter(question => question.id == id);
  }

  submitLike(){
    console.log("Lajk");
   
  }

  submitDislike(){
    console.log("Dilajk");
  }

  addToFavorites(){

  }

  submitAnswer(index){
    console.log("Odpovezeno na: ", index);
    
    this.answer = this.angFire.database.object('/question/' + this.counter + '/answersNumbers/');
    let value;
    this.answer.subscribe(answers =>{
      console.log(answers);
      value = answers[index];
      
    });
    console.log(value++);
    
    this.answer.$ref.child(index).set(value);
    


  /*  this.questionToDisplay[0].answersNumbers[index]++;
    var questionID = <string><any>this.questionToDisplay[0].id;
    this.questions.$ref.child(questionID).set(this.questionToDisplay[0]);*/
    this.increment();
  }


}
