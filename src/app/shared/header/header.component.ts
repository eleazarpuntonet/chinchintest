import { Component } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

export interface AppIcon {
  name?: string;
  src?: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    public sidebarservice: SidebarService,
    private authService: AuthService,
    private router: Router ) {

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  theme_name = 'light_mode'

  toggleSearch: boolean = false;

  darkMode() {
     return 'light_mode';
  }

  getSideBarSate() {
    return this.sidebarservice.getSidebarState();
  }


  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }

  openSearch() {
    this.toggleSearch = true;
  }

  searchClose() {
    this.toggleSearch = false;
  }


  appIcon: AppIcon[] = [
    { src: 'assets/images/app/apple.png', name: 'Apple' },
    { src: 'assets/images/app/behance.png', name: 'Behance' },
    { src: 'assets/images/app/slack.png', name: 'Slack' },
    { src: 'assets/images/app/bootstrap.png', name: 'Bootstrap' },
    { src: 'assets/images/app/google-drive.png', name: 'Drive' },
    { src: 'assets/images/app/outlook.png', name: 'Outlook' },
    { src: 'assets/images/app/github.png', name: 'GitHub' },
    { src: 'assets/images/app/stack-overflow.png', name: 'Overflow' },
    { src: 'assets/images/app/figma.png', name: 'Figma' },
    { src: 'assets/images/app/twitter.png', name: 'Twitter' },
    { src: 'assets/images/app/google-calendar.png', name: 'Calendar' },
    { src: 'assets/images/app/spotify.png', name: 'Spotify' },
    { src: 'assets/images/app/google-photos.png', name: 'Photos' },
    { src: 'assets/images/app/pinterest.png', name: 'Pinterest' },
    { src: 'assets/images/app/linkedin.png', name: 'linkedin' },
    { src: 'assets/images/app/dribble.png', name: 'Dribbble' },
    { src: 'assets/images/app/youtube.png', name: 'YouTube' },
    { src: 'assets/images/app/google.png', name: 'News' },
    { src: 'assets/images/app/envato.png', name: 'Envato' },
    { src: 'assets/images/app/safari.png', name: 'Safari' },


  ];


  ngOnInit() {


  }
}
