import {Injectable} from '@angular/core';

@Injectable()
export class FeedService {

  private _data = [
    {
      type: 'text-message',
      author: 'GTA',
      surname: '20',
 
    }, {
      type: 'video-message',
      author: 'APIA',
      surname: '10',
     }
  ];

  getData() {
    return this._data;
  }
}
