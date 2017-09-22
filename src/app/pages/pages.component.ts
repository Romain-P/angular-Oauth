import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';
import {RoleService} from "../services/role.service";
import {UtilService} from "app/services/util.service";

@Component({
  selector: 'pages',
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-header></ba-header>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">
      <div class="al-footer-right" translate>{{'general.created_with'}} <i class="ion-heart"></i></div>
      <div class="al-footer-main clearfix">
        <div class="al-copy">&copy; <a href="http://akveo.com" translate>{{'general.akveo'}}</a> 2016</div>
        <ul class="al-share clearfix">
          <li><i class="socicon socicon-facebook"></i></li>
          <li><i class="socicon socicon-twitter"></i></li>
          <li><i class="socicon socicon-google"></i></li>
          <li><i class="socicon socicon-github"></i></li>
        </ul>
      </div>
    </footer>
    <ba-back-top position="200"></ba-back-top>
    `
})
export class Pages {

  constructor(private _menuService: BaMenuService, private roleService: RoleService, private util: UtilService) {
  }

  ngOnInit() {
    let cpy = this.util.cloneObject(PAGES_MENU);
    let length = cpy[0].children.length;

    for (let i = 0; i < length; i++) {
      let x = cpy[0].children[i];

      if (!this.roleService.hasAnyRole(x.data.roles)) {
        cpy[0].children.splice(i--, 1);
        length--;
      }
    }

    this._menuService.updateMenuByRoutes(<Routes>cpy);
  }
}
