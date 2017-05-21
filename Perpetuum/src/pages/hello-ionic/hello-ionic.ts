import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
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
  user: FirebaseObjectObservable<any>;
  answers: FirebaseObjectObservable<any>;
  answersArray: Array<string>;
  answer: FirebaseObjectObservable<any>;
  questionsAll: FirebaseObjectObservable<any>;
  questionsAnswered: FirebaseObjectObservable<any>;

  counter: number;
  numberOfQuestions: number;
  title: string;
  likes: number;
  dislikes: number;
  answeredFlag: boolean;
  answersNumbers: Array<any>;
  selectedAnswer: number;
  likedFlag: boolean;
  dislikedFlag: boolean;
  notAnswered: string[];
  noQuestions: boolean;
  money: number;
  questionID: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public angFire: AngularFire,
    public loadingCtrl: LoadingController, private alertCtrl: AlertController) {

    this.counter = 0;
    this.answeredFlag = false;
    this.likedFlag = false;
    this.dislikedFlag = false;
    this.noQuestions = false;
    this.questionsAll = angFire.database.object('/question');
    this.notAnswered = [];

    this.findNotAnswered();
    let loading = this.loadingCtrl.create({
      content: 'Čekejte prosím...'
    });

    loading.present();

    setTimeout(() => {
      if (this.notAnswered.length > 0) {
        this.noQuestions = false;
      }
      loading.dismiss();
      //console.log("neodpovezene", this.notAnswered);
      if (!this.noQuestions) {
        this.questions = angFire.database.object('/question/' + this.notAnswered[this.counter]);
        console.log(this.questions);
        this.answersNumbers = [];
        this.questions.subscribe(question => {
          console.log(question);
          this.title = question.title;
          this.likes = question.likes;
          this.dislikes = question.dislikes;
          this.questionID = question.id;
        })
        this.answers = angFire.database.object('/question/' + this.notAnswered[this.counter] + '/answers/');

        // Get number of questions
        this.questionsAll.subscribe(question => {
          this.numberOfQuestions = 0;
          Object.keys(question).forEach(key => { this.numberOfQuestions++; });
        });

      }
    }, 2000);

    this.user = angFire.database.object('/users/' + 0);
    this.user.subscribe(user => {
      this.money = user.money;

    });


  }

  findNotAnswered() {
    this.notAnswered = [];

    this.questionsAll.subscribe(items => {
      Object.keys(items).forEach(key => {
        //console.log("key", key);
        if (items[key].usersAnswered != undefined) {
          items[key].usersAnswered.forEach((answered, index) => {
            //console.log(index, answered);
            if (index == 0 && answered == false) {
              this.notAnswered.push(key);

            }
          });
        }

      });

    });
    if (this.notAnswered.length == 0) {
      this.noQuestions = true;
    } else {
      this.noQuestions = false;
    }
  }




  increment() {
    this.findNotAnswered();
    let loading = this.loadingCtrl.create({
      content: 'Čekejte prosím...'
    });

    loading.present();
    setTimeout(() => {
      loading.dismiss();
      // Rotation of notAnswered questions
      if (this.counter >= (this.notAnswered.length - 1)) {
        this.counter = 0;
      } else {
        this.counter++;
      }

      if (!this.noQuestions) {
        console.log(this.counter);
        this.questions = this.angFire.database.object('/question/' + this.notAnswered[this.counter]);
        this.questions.subscribe(question => {
          this.title = question.title;
          this.likes = question.likes;
          this.dislikes = question.dislikes;
          this.questionID = question.id;
        });

        this.answers = this.angFire.database.object('/question/' + this.notAnswered[this.counter] + '/answers/');

        this.answeredFlag = false;
        this.likedFlag = false;
        this.dislikedFlag = false;

      }
    }, 1000);
  }

  ionViewDidLoad() {
    this.findNotAnswered();
  }



  submitLike() {
    console.log("Lajk");
    let likes: any;
    this.questions = this.angFire.database.object('/question/' + this.notAnswered[this.counter]);
    this.questions.subscribe(question => {
      likes = question.likes;

    });
    if (this.likedFlag === false) {
      likes++;
      this.questions.$ref.child('/').on('value', function (question) {
        question.ref.child('likes').set(likes);

      });
      this.likedFlag = true;
    }
  }

  submitDislike() {
    console.log("Dilajk");
    let dislikes: any;
    this.questions = this.angFire.database.object('/question/' + this.notAnswered[this.counter]);
    this.questions.subscribe(question => {
      dislikes = question.dislikes;

    });
    if (this.dislikedFlag === false) {
      dislikes++;
      this.questions.$ref.child('/').on('value', function (question) {
        question.ref.child('dislikes').set(dislikes);

      });
      this.dislikedFlag = true;
    }
  }

  addToFavourites() {
    let favQuestions: any;
    this.user.subscribe(user => {
      favQuestions = user.favQuestions;
    });
    favQuestions.push(this.questionID);
    this.user.$ref.child('favQuestions').set(favQuestions);

    let alert = this.alertCtrl.create({
      title: 'Přidáno do oblíbených',
      subTitle: '',
      buttons: ['OK']
    });
    alert.present();

  }

  submitAnswer(index) {
    console.log("Odpovezeno na: ", index);
    this.selectedAnswer = index;

    this.answer = this.angFire.database.object('/question/' + this.notAnswered[this.counter] + '/answersNumbers/');
    let value;
    this.answer.subscribe(answers => {
      console.log(answers);
      value = answers[index];

    });
    value++;

    let numberOfAnswers: any;

    this.questions = this.angFire.database.object('/question/' + this.notAnswered[this.counter]);
    this.questions.subscribe(question => {
      numberOfAnswers = question.numAnswers;

    });
    numberOfAnswers++;
    console.log(numberOfAnswers);
    //this.questions.$ref.child('/answersNumbers/').child(index).set(value);// inkrementace poctu odpovedi pro konkretni otazku
    // inkrementace poctu odpovedi celkove
    this.questions.$ref.child('/').on('value', function (question) {
      question.ref.child('numAnswers').set(numberOfAnswers);
      question.ref.child('/answersNumbers/').child(index).set(value);
      question.ref.child('/usersAnswered/').child("0").set(true);
    });

    // Vsechny pocty odpovedi do pole
    this.answer.subscribe(answer => {
      answer.forEach((value, index) => {
        var percent = Math.round((value / numberOfAnswers) * 100);
        this.answersNumbers[index] = percent;
      });
    });
    // Increment money
    this.money = this.money + 1;
     this.user.$ref.child('/').on('value', function (user) {
      user.ref.child("money").set(this.money);
    });
    
     let answeredQuestions: any;
    this.user.subscribe(user => {
      answeredQuestions = user.questionsAnswered;
    });
    answeredQuestions.push(this.questionID);
    this.user.$ref.child('questionsAnswered').set(answeredQuestions);

    this.answeredFlag = true;
    // Update array of non answered questions
    this.findNotAnswered();
    if (this.notAnswered.length == 0) {
      this.noQuestions = true;
    } else {
      this.noQuestions = false;
    }

  }


}
