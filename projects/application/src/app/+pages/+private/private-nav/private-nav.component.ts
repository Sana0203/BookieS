import { Component, inject, OnInit } from '@angular/core';
import { SecurityService } from '../../../../../../infra-lib/src/public-api';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-private-nav',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './private-nav.component.html',
  styleUrl: './private-nav.component.scss'
})
export class PrivateNavComponent implements OnInit{
  // isDropdown: boolean = false;
  // isMenu:boolean = true;

  service = inject(SecurityService);
  // user_name:any = {};

  ngOnInit(): void {
    initFlowbite();
    // this.user_name = this.service.getInfo().name;
  }

  // isDropdownOpen(){
  //   this.isDropdown = !this.isDropdown;
  // }

  // isMenuOpen(){
  //   this.isMenu = !this.isMenu;
  // }
  
}
