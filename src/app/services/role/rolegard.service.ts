import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {RoleService} from "./role.service";

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private service: RoleService) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const roles = route.data["roles"] as Array<string>;
    return this.service.hasAnyRole(roles);
  }
}
