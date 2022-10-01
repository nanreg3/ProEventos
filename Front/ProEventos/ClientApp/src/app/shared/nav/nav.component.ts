import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(private router : Router) { }

  public isCollapsed = true;

  public showMenu(): boolean {
    return this.router.url !== '/user/login';
  }

}
