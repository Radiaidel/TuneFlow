import { Component  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { TrackFormComponent } from "./tracks/track-form/track-form.component";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, TrackFormComponent , CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TuneFlow';
  isFormVisible: boolean = false;

  handleFormVisibilityChange(isVisible: boolean) {
    this.isFormVisible = isVisible;
  }
}
