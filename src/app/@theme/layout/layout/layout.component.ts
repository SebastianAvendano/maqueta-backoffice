import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../sidebar.service';
import { AuthService } from '../../../../providers/auth/auth.service';
import { NavigatorService } from '../../../../providers/navigation/navigator/navigator.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  showLayout: boolean = false;
  isCollapsed: boolean = false;

  constructor(
    private auth: AuthService,
    private navCtrol: NavigatorService,
    private sidebarService: SidebarService,
  ) {}

  ngOnInit(): void {
    this.suscribeSession()
    this.validateCurrentUser()
    this.collapsedObservable()
  }

  collapsedObservable(): void {
    this.isCollapsed = this.sidebarService.isCollapsed
    this.sidebarService.collapsedObservable$.subscribe((isCollapsed) => {
      this.isCollapsed = isCollapsed
    })
  }

  async logout() {
    this.auth.session(false)
    await this.auth.logout()
    this.navCtrol.Push('/login')
  }

  async validateCurrentUser(): Promise<void> {
    const userSuscribe = this.auth.getCurrentUser().subscribe((user?) => {
      this.showLayout = (user != null)
      userSuscribe.unsubscribe()
    })

  }

  suscribeSession(): void {
    this.auth.session$.subscribe((isSession) => {
      this.showLayout = isSession
    })
  }

}
