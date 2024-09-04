import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SecurityService } from '../../../../../../infra-lib/src/public-api';
import { UserToken } from '../../../../../../core-lib/src/public-api';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'app-private-nav',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    FormsModule,
    CommonModule,
    NgClass
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
