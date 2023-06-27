import { Component, OnInit, inject, Injectable } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import {
  Firestore,
  collection,
  collectionData,
  CollectionReference,
  DocumentData,
  addDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

import { Observable } from 'rxjs';
import { initializeApp } from 'firebase/app';
import { GameInfoComponent } from '../game-info/game-info.component';
import { getFirestore } from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  game: Game | undefined;
  games;
  currentCard: string = '';
  items$: Observable<any[]>;
  aCollection: any;
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);
  gameId: string;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private firestore: Firestore
  ) {
    this.aCollection = collection(this.firestore, 'games');
    this.items$ = collectionData(this.aCollection);
    this.games = this.items$;
  }

  async ngOnInit() {
    this.newGame();

    this.route.params.subscribe(async (params) => {
      this.gameId = params['id'];
      const docRef = doc(this.db, 'games', this.gameId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.game.currentPlayer = docSnap.data()['currentPlayer'];
        this.game.playedCards = docSnap.data()['playedCards'];
        this.game.players = docSnap.data()['players'];
        this.game.stack = docSnap.data()['stack'];
      } else {
        // docSnap.data() will be undefined in this case
        console.log('No such document!');
      }
    });
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      console.log(this.currentCard);
      console.log('a' + this.game.playedCards);

      this.game.currentPlayer++;
      this.game.currentPlayer =
        this.game.currentPlayer % this.game.players.length;
      console.log(this.game.players);
      this.saveGame();

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }

  async saveGame() {
    this.aCollection = collection(this.firestore, 'games');
    const docRef = doc(this.db, 'games', this.gameId);

    await updateDoc(docRef, this.game.toJson());
  }
}
