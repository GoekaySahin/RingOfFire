import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { StartScreenComponent } from "./start-screen/start-screen.component";
import { GameComponent } from "./game/game.component";
import { PlayerComponent } from "./player/player.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { DialogAddPlayerComponent } from "./dialog-add-player/dialog-add-player.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { GameInfoComponent } from "./game-info/game-info.component";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { environment } from "../environments/environment";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { provideDatabase, getDatabase } from "@angular/fire/database";
import { provideFirestore, getFirestore } from "@angular/fire/firestore";
import { PlayerMobileComponent } from "./player-mobile/player-mobile.component";

/* const firebaseConfig = {
  apiKey: "AIzaSyA3B4cDOaFaw53wji-lY4tMtrmG0IoFufs",
  authDomain: "ringof-4e427.firebaseapp.com",
  databaseURL:
    "https://ringof-4e427-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ringof-4e427",
  storageBucket: "ringof-4e427.appspot.com",
  messagingSenderId: "384138021403",
  appId: "1:384138021403:web:1cfe4fb4c8117ea30306be",
};

const app = initializeApp(firebaseConfig); */

@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponent,
    GameComponent,
    PlayerComponent,
    DialogAddPlayerComponent,
    GameInfoComponent,
    PlayerMobileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
