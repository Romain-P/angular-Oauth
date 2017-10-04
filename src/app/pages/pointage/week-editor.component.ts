import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';
import {Absence} from "../../models/absence";
import {PointageManagerComponent} from "./pointageManager.component";
import {current} from "codelyzer/util/syntaxKind";
import {isNullOrUndefined} from "util";
@Component({
  template: `
  <input  type="text"
  onkeypress='return event.charCode >= 48 && event.charCode <= 57'
  [ngClass]="inputClass"
  #name
  class="form-control ng-pristine ng-valid ng-touched"
  [name]="cell.getId()"
  [disabled]="absent()"    
  [placeholder]="cell.getTitle()"
  (click)="onClick.emit($event)"
  (keyup)="updateValue()"
  (keydown.enter)="onEdited.emit($event)"
  (keydown.esc)="onStopEditing.emit()">
  `,
})
export class CustomWeekEditorComponent extends DefaultEditor implements AfterViewInit {
  @ViewChild('name') name: ElementRef;

  constructor() {
    super();
  }

  ngAfterViewInit() {
    let absence: Absence = this.isAbsentAndGet();
    this.name.nativeElement.value = isNullOrUndefined(absence) ? this.cell.newValue : "ABS - " + absence.absence_type;
  }

  updateValue() {
    const name = this.name.nativeElement.value;
    this.cell.newValue = name;
  }

  absent(): boolean {
    let absence = this.isAbsentAndGet();
    return !isNullOrUndefined(absence);
  }

  isAbsentAndGet(): Absence {
    let absences: Absence[] = PointageManagerComponent.absenceDays;
    let dayName: string = this.cell.getTitle().toLowerCase();
    let dayNumber: number = dayName === 'lundi' ? 1 :
      dayName === 'mardi' ? 2 :
      dayName === 'mercredi' ? 3 :
      dayName === 'jeudi' ? 4 :
      dayName === 'vendredi' ? 5 :
      dayName === 'samedi' ? 6 : 7;

    return absences.find(x =>  x.week_number == PointageManagerComponent.semaineSelectionneeS &&
      x.day == dayNumber &&
      x.year == PointageManagerComponent.anneSelectionneS);
  }


}
