import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';
import { Activity } from '../../models/activity';
@Component({
  template: `
{{renderValue}}
  `,
})
export class CustomEditorComponent extends DefaultEditor implements AfterViewInit {

  renderValue: string;
  
  

    constructor() {
      super();
    }
  
    ngAfterViewInit() {
      if (this.cell.newValue !== '') {
        let act = this.cell.newValue as Activity;
        this.renderValue = act.name ;
      }
    }

}
