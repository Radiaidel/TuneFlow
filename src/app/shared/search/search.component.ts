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

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement | null;  // Ajoutez null pour gérer les cas où event.target est null
  
    if (inputElement) {  // Assurez-vous que inputElement n'est pas null
      const searchValue = inputElement.value;
      this.search.emit(searchValue);
    } else {
      console.error('Input element is null or not an input field');
    }
  }
  
  
  
}