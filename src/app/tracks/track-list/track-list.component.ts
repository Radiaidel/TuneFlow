import { Component, OnDestroy, OnInit } from '@angular/core';
import { Track } from '../../models/track.model';
import { CommonModule } from '@angular/common';
import { IndexedDBService } from '../../services/indexeddb.service';
import { TrackCardComponent } from '../track-card/track-card.component';
import { SearchComponent } from '../../shared/search/search.component';

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [CommonModule , TrackCardComponent , SearchComponent],
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss'],
})
export class TrackListComponent implements OnInit, OnDestroy {
  audioUrl: string | null = null;
  track: Track | null = null;
  private audio: HTMLAudioElement | null = null;

  constructor(private indexedDBService: IndexedDBService) {}

  ngOnInit(): void {
    const trackId = 'kp748dhy7m';
    this.indexedDBService.getTrackById(trackId).subscribe({
      next: (track) => {
        if (track?.audio) {
          this.track = track;
          this.audioUrl = URL.createObjectURL(track.audio);
          this.audio = new Audio(this.audioUrl);
        }
      },
      error: (err) => console.error('Error fetching track:', err),
    });
  }

  ngOnDestroy(): void {
    if (this.audioUrl) {
      URL.revokeObjectURL(this.audioUrl);
    }
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }

  playAudio(): void {
    if (this.audio) {
      this.audio.play().catch(err => console.error('Error playing audio:', err));
    }
  }
}