import {Component, Input} from '@angular/core';

import {FeedService} from './feed.service';
import { Stat } from '../../../../models/stat';

@Component({
  selector: 'feed',
  templateUrl: './feed.html',
  styleUrls: ['./feed.scss']
})
export class Feed {
@Input()
private stat: Stat;
  public feed:Array<Object>;

  constructor(private _feedService:FeedService) {
  }

  ngOnInit() {
    this._loadFeed();
  }

  expandMessage (message){
    message.expanded = !message.expanded;
  }

  private _loadFeed() {
    this.feed = this._feedService.getData();
  }
}
