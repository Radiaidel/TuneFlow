import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Track } from '../../models/track.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-track-card',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './track-card.component.html',
  styleUrl: './track-card.component.scss'
})
export class TrackCardComponent {

  @Input() track!: Track;
  @Input() index!: number;
  @Output() onDelete = new EventEmitter<string>();
  @Output() onEdit = new EventEmitter<Track>();

  formatIndex(index: number): string {
    return index.toString().padStart(2, '0');
  }
  playTrack(){}
}