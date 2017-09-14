import {Component, OnInit} from '@angular/core';
import {LocalDataSource, ViewCell} from 'ng2-smart-table';
import {UserService} from '../../services/user/user.service';
import {User} from '../../models/user';
import {Role} from "../../models/role";
import {RoleService} from "../../services/role/role.service";

@Component({
  selector: 'roleAssignment',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleAssignmentComponent implements OnInit {
  private source: LocalDataSource;
  private users: User[];
  private roleList: Role[];
  private selectRoleList: Role[];
  private userRoles: Role[];
  private settings: Object;
  private selectedRoles: Object[];
  private rolesToDelete: Object[];
  private selectedUser: User;

  constructor(private service: UserService, private roleService: RoleService) {
    this.source = new LocalDataSource();
    this.selectedUser = new User();
    this.rolesToDelete = [];
    this.selectedRoles = [];
  }

  public ngOnInit() {
    this.loadData();
  }

  public loadTableSettings() {
    return {
      mode: external,
      actions: false,
      columns: {
        name: {title: 'Nom', type: 'string'},
        lastname: {title: 'lastname', type: 'string'},
        email: {title: 'email', type: 'string'},
        superior: {
          title: 'Supérieur',
          valuePrepareFunction: (value) => {
            const act = value as User;
            return act ? `${act.name} ${act.lastname}` : '/';
          },
        },
      },
    };
  }

  private loadData(): void {
    this.users = [];
    this.roleList = [];
    this.selectRoleList = [];
    this.service.getUsers().then((users) => {
      this.users = users;
      this.settings = this.loadTableSettings();
      this.source.reset(true);
      this.source.load(users);
    });
    this.roleService.getRoles().then((roles) => {
      roles.forEach(role => {
        this.roleList.push(role);
        this.selectRoleList.push(role);
      });
    });
  }


  public onRowSelect(event): void {
    this.selectRoleList = [];
    this.roleList.forEach(role => this.selectRoleList.push(role as Role));
    this.userRoles = [];
    const list = event.data.roles as Role[];
    list.forEach(element => {
      this.userRoles.push(element as Role);
      let ind = this.selectRoleList.indexOf(this.selectRoleList
        .find(c => c.id === element.id));
      if (ind >= 0) {
        this.selectRoleList.splice(ind, 1);
      }
    });
    this.selectedUser = event.data as User;
  }

  public addRole(event): void {
    if (this.selectedRoles.length > 0) {
      this.selectedRoles.forEach(roleId => {
        const act = this.selectRoleList.find(c => c.id === roleId);

        this.selectRoleList.splice(this.selectRoleList.indexOf(act), 1);
        this.userRoles.push(act);

      });

      this.selectedUser.roles = this.userRoles;
      this.service.saveUser(this.selectedUser);
      this.selectedRoles = [];
    }
  }

  public delRole(event): void {
    if (this.rolesToDelete.length > 0) {
      this.rolesToDelete.forEach(roleId => {
        const act = this.userRoles.find(c => c.id === roleId);
        this.userRoles.splice(this.userRoles.indexOf(act), 1);
        this.selectRoleList.push(act);
      });
      this.selectedUser.roles = this.userRoles;
      this.service.saveUser(this.selectedUser);
      this.selectedUser.roles = this.userRoles;
      this.rolesToDelete = [];
    }
  }
}
