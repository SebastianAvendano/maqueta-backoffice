import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private sidebarService: SidebarService,

  ) { }

  ngOnInit() {
  }

  toogleCollapsed() : void {
    this.sidebarService.collapsed(!this.sidebarService.isCollapsed)
  }

}
