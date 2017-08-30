import { Component, OnInit , Input } from '@angular/core';
import { Activity } from '../../models/activity';

import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
   {{renderValue}}
  `,
})
export class CustomEditorComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

}
