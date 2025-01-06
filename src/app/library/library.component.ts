import { Component } from '@angular/core';
import { TrackListComponent } from '../tracks/track-list/track-list.component';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [TrackListComponent],
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent {
}
