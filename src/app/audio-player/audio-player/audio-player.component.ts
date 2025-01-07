import { Component, OnInit } from '@angular/core';
import { AudioPlayerService } from '../../services/audio-player.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Track } from '../../models/track.model';

@Component({
  standalone: true,
  selector: 'app-audio-player',
  imports: [CommonModule, FormsModule],
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {
  private currentTrackSubject = new BehaviorSubject<Track | null>(null);
  public currentTrack$ = this.currentTrackSubject.asObservable();
  isPlaying$ = new BehaviorSubject<boolean>(false);
  isPlaying: boolean = false;
  currentTrack: Track | null = null;
  currentTime: number = 0;
  duration: number = 0;
  volume: number = 1;

  constructor(private audioPlayerService: AudioPlayerService) { }

  ngOnInit(): void {
    this.audioPlayerService.currentTrack$.subscribe(track => {
      this.currentTrack = track;
    });

    this.audioPlayerService.isPlaying$.subscribe(isPlaying => {
      this.isPlaying = isPlaying;
    });

    this.audioPlayerService.audio.addEventListener('timeupdate', () => {
      this.currentTime = this.audioPlayerService.getCurrentTime();
      this.duration = this.audioPlayerService.getDuration();
    });
  }

  playPauseTrack() {
    if (this.isPlaying) {
      this.audioPlayerService.pauseTrack();
    } else {
      if (this.currentTrack) {
        this.audioPlayerService.playTrack(this.currentTrack);
      }
    }
  }

  nextTrack() {
    this.audioPlayerService.nextTrack();
  }

  prevTrack() {
    this.audioPlayerService.prevTrack();
  }

  setVolume(event: Event): void {
    const input = event.target as HTMLInputElement;
    const volume = input.valueAsNumber;
    this.audioPlayerService.setVolume(volume);
  }
  

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  seekAudio(event: any) {
    const value = event.target.value;
    this.audioPlayerService.seek(value);
    this.updateProgressBar();
  }
  
  updateProgressBar() {
    const progressBar = document.querySelector('.progress-slider') as HTMLInputElement;
    if (progressBar) {
      const percentage = (this.currentTime / this.duration) * 100;
      progressBar.style.setProperty('--value', `${percentage}%`);
    }
  }

}

