import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent {
  aCollection: any;
  constructor(private firestore: Firestore, private router: Router) {}

  ngOnInit(): void {}

  newGame() {
    //Start Game
    let id;
    let game = new Game();
    this.aCollection = collection(this.firestore, 'games');
    const _aCollection = this.aCollection;
    addDoc(_aCollection, game.toJson()).then((gameInfo) => {
      this.router.navigateByUrl('/game/' + gameInfo['id']);
    });
  }
}
