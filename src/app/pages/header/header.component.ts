import {Component} from '@angular/core';
import {GlobalState} from "../../global.state";
import {AuthenticationService} from "../../services/authentication.service";
import {Login} from "../login/login.component";
import {Router} from "@angular/router";

@Component({
  selector: 'ba-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;

  constructor(private _state:GlobalState, private authenticationService: AuthenticationService, private router: Router) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public signOut() {
    this.authenticationService.logout();
    this.router.navigateByUrl("/login")
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }
}
