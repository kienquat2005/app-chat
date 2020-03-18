import { ChatMessage } from './../models/chat-message.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList, AngularFireDatabaseModule } from 'angularfire2/database';
import * as firebase from 'firebase/app'
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: any;
  chatMessages: AngularFireList<ChatMessage>;
  chatMessage: ChatMessage;
  userName: Observable<string>;


  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth) {
      // this.afAuth.authState.subscribe(auth => {
      //   if(auth !== undefined && auth !== null) {
      //     this.user = auth;
      //   }
      // })
     }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    // const email = this.user.email;
    const email = 'test@gmail.com';
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      // userName: this.userName,
      userName: 'test-user',
      email: email });

  }

  getMessages(){
    console.log('calll getMessage()....');
    return this.db.list('/messages', ref => {
      return ref.limitToLast(25).orderByKey()
    });
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                 (now.getUTCMonth() + 1) + '/' +
                 now.getUTCDate();

    const time = now.getUTCHours() + ':' +
                 now.getUTCMinutes() + ':' +
                 now.getUTCSeconds();

    return  (date + ' ' + time);
  }
}
