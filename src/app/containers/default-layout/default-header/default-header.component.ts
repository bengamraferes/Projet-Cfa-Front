import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { AuthenticationService } from 'src/app/_services/authentication.service';


@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService,   private authenticationService:AuthenticationService,private router:Router) {
    super();
  }
  logout(){
    this.authenticationService.logout();
    this.router.navigate(["/login"])
  }
}
