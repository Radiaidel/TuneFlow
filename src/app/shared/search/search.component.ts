import { Component, EventEmitter, Output } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Track } from '../../models/track.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Output() search = new EventEmitter<string>();

  onSearch(value: string) {
    this.search.emit(value);
  }
}