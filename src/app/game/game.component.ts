import { Component, OnInit, inject, Injectable } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import {
  Firestore,
  collection,
  collectionData,
  CollectionReference,
  DocumentData,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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

  constructor(public dialog: MatDialog, private firestore: Firestore) {
    const aCollection = collection(this.firestore, 'games');
    this.items$ = collectionData(aCollection);
    this.games = this.items$;
  }

  ngOnInit(): void {
    this.newGame();
    this.items$.subscribe((game) => {
      console.log(game);
    });
  }

  update() {
    /* const aCollection = doc(this.firestore, 'games');
    return updateDoc(aCollection, { Hallo: 'Welt' }); */
  }

  newGame() {
    this.game = new Game();
    const _doc = doc(this.games)
    updateDoc(_doc);
    this.games.add({ Hallo: 'Welt' });
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      console.log(this.currentCard);
      console.log('a' + this.game.playedCards);
    }

    this.game.currentPlayer++;
    this.game.currentPlayer =
      this.game.currentPlayer % this.game.players.length;

    setTimeout(() => {
      this.game.playedCards.push(this.currentCard);
      this.pickCardAnimation = false;
    }, 1000);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}
