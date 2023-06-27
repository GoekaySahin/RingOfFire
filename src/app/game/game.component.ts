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
  updateDoc,
} from '@angular/fire/firestore';
import { doc, getDocFromCache, getDoc } from 'firebase/firestore';

import { Observable } from 'rxjs';
import { initializeApp } from 'firebase/app';
import { GameInfoComponent } from '../game-info/game-info.component';
import { getFirestore } from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private firestore: Firestore
  ) {
    this.aCollection = collection(this.firestore, 'games');
    this.items$ = collectionData(this.aCollection);
    this.games = this.items$;
  }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.aCollection
        .doc(params['id'])
        .valueChanges()
        .subscribe('Game upate ', this.game);
    });
  }

  /*       this.items$.doc(params['id']).subscribe((game) => {
          console.log(game); */
  newGame() {
    this.game = new Game();
    /*     const _aCollection = this.aCollection;
    addDoc(_aCollection, this.game.toJson()); */
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
    console.log(this.game.players);

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
        console.log(this.game.players);
      }
    });
  }
}
