import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NgClass, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  activeTab: string = 'home';

  @Output() isFormVisible: EventEmitter<boolean> = new EventEmitter<boolean>();

  toggleFormVisibility() {
    this.isFormVisible.emit(true);
  }
}
