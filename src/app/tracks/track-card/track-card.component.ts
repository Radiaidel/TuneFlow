import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Track } from '../../models/track.model';
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { AudioPlayerService } from '../../services/audio-player.service';

@Component({
  selector: 'app-track-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track-card.component.html',
})
export class TrackCardComponent {
  @Input() track!: Track;
  @Input() index!: number;
  @Output() onDelete = new EventEmitter<string>();  
  @Output() onEdit = new EventEmitter<Track>();     
 
  constructor(
    private audioPlayerService: AudioPlayerService,
    private router: Router  
  ) {}

  formatIndex(index: number): string {
    if (index === undefined || index === null) {
      return '00'; 
    }
    return index.toString().padStart(2, '0');
  }
  

  playTrack(track: Track) {
    console.log('Playing track', track);
    this.router.navigate(['/play']).then(() => {
      this.audioPlayerService.playTrack(track);
    });
  }

  onDeleteTrack() {
    this.onDelete.emit(this.track.id);
  }

  onEditTrack() {
    this.onEdit.emit(this.track);
  }
}
