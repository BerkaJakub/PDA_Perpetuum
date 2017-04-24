import { Component } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  questions: FirebaseListObservable<any>;

  constructor(angFire: AngularFire) {
    this.questions = angFire.database.list('/questions');
  }
}
