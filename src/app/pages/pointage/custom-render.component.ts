import { Component, OnInit , Input } from '@angular/core';

@Component({
    selector: 'span-view',
    template: `
      <span>{{ renderValue }}</span>
    `,
  })
export class CustomEditorComponent implements OnInit {
 @Input() value: any;   

    renderValue: string;
    constructor(val: any ) {
        this.value = val;
           }
    ngOnInit() {
        this.renderValue = this.value.toString();
      }
}
