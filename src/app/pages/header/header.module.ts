import { NgModule }      from '@angular/core';
import {Header} from "./header.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {AppTranslationModule} from "../../app.translation.module";
import {FormsModule} from "../forms/forms.module";
import {NgaModule} from "../../theme/nga.module";

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule
  ],
  declarations: [
    Header
  ],
  exports: [
    Header
  ]
})
export class HeaderModule {}
