import { Component, OnInit } from '@angular/core';
import { StatService } from '../../services/stat.service';
import { Stat } from '../../models/stat';
@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {

  stat: Stat;

  constructor(private service: StatService) {
  }
  public ngOnInit() {
    this.loadData();
  }

  private loadData(): void {

    this.service.getStats().then((st) => {
      this.stat = st;

    });
  }

}
