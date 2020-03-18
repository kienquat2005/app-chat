import { ChatMessage } from './../models/chat-message.model';
import { AngularFireList } from 'angularfire2/database';
import { ChatService } from './../services/chat.service';
import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnChanges {

  feed$;
  constructor(private chat: ChatService) { }

  ngOnInit() {
    console.log('feed initiailing.....');

    this.feed$ = this.chat.getMessages().valueChanges();
  }

  ngOnChanges() {
    this.feed$ = this.chat.getMessages();
  }

}
