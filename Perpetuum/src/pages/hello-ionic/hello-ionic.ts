import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'nonAnswered' })
export class QuestionPipe implements PipeTransform {
  transform(questions: any[]) {
    return questions.filter(question => question.usersAnswered[0] === false); // filter only user 0, only questions he didnot answered
  }
}



@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  questions: FirebaseObjectObservable<any>;
  answers: FirebaseObjectObservable<any>;
  answersArray: Array<string>;
  answer: FirebaseObjectObservable<any>;
  questionsAll: FirebaseObjectObservable<any>;
  

  counter: number;
  numberOfQuestions: number;
  title: string;
  likes: number;
  dislikes: number;
  answeredFlag: boolean;
  answersNumbers: Array<any>;
  selectedAnswer: number;


  constructor(public navCtrl: NavController, public navParams: NavParams, public angFire: AngularFire) {

    this.counter = 0;
    this.answeredFlag = false;
    this.questionsAll = angFire.database.object('/question');
    this.questions = angFire.database.object('/question/' + this.counter);
    this.answersNumbers = [];
    this.questions.subscribe(question => {
      this.title = question.title;
      this.likes = question.likes;
      this.dislikes = question.dislikes;
    })
    
    this.answers = angFire.database.object('/question/' + this.counter + '/answers/');

    // Get number of questions
    this.questionsAll.subscribe(question =>{
      this.numberOfQuestions = 0;
      question.forEach(q =>{this.numberOfQuestions++;});
    });


  }



  increment() {

    if (this.counter >= (this.numberOfQuestions-1)) {
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
    this.answeredFlag = false;

  }



  submitLike() {
    console.log("Lajk");

  }

  submitDislike() {
    console.log("Dilajk");
  }

  addToFavorites() {

  }

  submitAnswer(index) {
    console.log("Odpovezeno na: ", index);
    this.selectedAnswer = index;
    
    this.answer = this.angFire.database.object('/question/' + this.counter + '/answersNumbers/');
    let value;
    this.answer.subscribe(answers => {
      console.log(answers);
      value = answers[index];

    });
    value++;

    let numberOfAnswers : any
    this.questions = this.angFire.database.object('/question/' + this.counter);
    this.questions.subscribe(question => {
        numberOfAnswers = question.numAnswers;
    });
    numberOfAnswers++;
    console.log(numberOfAnswers);
    //this.questions.$ref.child('/answersNumbers/').child(index).set(value);// inkrementace poctu odpovedi pro konkretni otazku
    // inkrementace poctu odpovedi celkove
    this.questions.$ref.child('/').on('value', function(question){
             question.ref.child('numAnswers').set(numberOfAnswers);
             question.ref.child('/answersNumbers/').child(index).set(value);
    });

    // Vsechny pocty odpovedi do pole
    this.answer.subscribe(answer => {
      answer.forEach((value, index) =>{
        var percent = Math.round((value / numberOfAnswers) * 100); 
        this.answersNumbers[index] = percent;
      });
    });
    
    this.answeredFlag = true;

  }


}
