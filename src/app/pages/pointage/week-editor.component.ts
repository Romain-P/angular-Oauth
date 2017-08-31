import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';
@Component({
  template: `
  <input  type="text"
  onkeypress='return event.charCode >= 48 && event.charCode <= 57'
  [ngClass]="inputClass"
  #name
  class="form-control ng-pristine ng-valid ng-touched"
  [name]="cell.getId()"
  [disabled]="!cell.isEditable()"
  [placeholder]="cell.getTitle()"
  (click)="onClick.emit($event)"
  (keyup)="updateValue()"
  (keydown.enter)="onEdited.emit($event)"
  (keydown.esc)="onStopEditing.emit()">
  `,
})
export class CustomWeekEditorComponent extends DefaultEditor implements AfterViewInit {

  renderValue: number;
  
  @ViewChild('name') name: ElementRef;


  constructor() {
    super();
  }

  ngAfterViewInit() {
    if (this.cell.newValue !== '') {
      this.name.nativeElement.value = this.cell.newValue;
   
    }
  }
  updateValue() {
    const name = this.name.nativeElement.value;
    this.cell.newValue = name;
  }


}
