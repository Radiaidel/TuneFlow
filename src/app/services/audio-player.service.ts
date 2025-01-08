import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Track } from '../models/track.model';
import { IndexedDBService } from './indexeddb.service';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {
  public audio: HTMLAudioElement;
  private currentTrackSubject = new BehaviorSubject<Track | null>(null);
  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  private trackListSubject = new BehaviorSubject<Track[]>([]);
  private currentTrackIndex = 0;

  currentTrack$ = this.currentTrackSubject.asObservable();
  isPlaying$ = this.isPlayingSubject.asObservable();
  trackList$ = this.trackListSubject.asObservable();

  constructor(private indexedDBService: IndexedDBService) {
    this.audio = new Audio();
    this.initializeAudioEvents();
    this.loadTracks();
  }

  private initializeAudioEvents() {
    this.audio.addEventListener('ended', () => {
      this.nextTrack();
    });

    this.audio.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      this.isPlayingSubject.next(false);
    });
  }

  private loadTracks() {
    this.indexedDBService.getAllTracks().subscribe(
      (tracks) => {
        this.trackListSubject.next(tracks);
        if (tracks.length > 0) {
          this.currentTrackSubject.next(tracks[0]);
        }
      },
      (error) => console.error('Error loading tracks:', error)
    );
  }

  async playTrack(track: Track) {
    try {
      const audioFile = await this.indexedDBService.getAudioFile(track.id).toPromise();
      if (audioFile && audioFile.audio) {
        const audioUrl = URL.createObjectURL(audioFile.audio);
        this.audio.src = audioUrl;
        await this.audio.play();
        this.currentTrackSubject.next(track);
        this.isPlayingSubject.next(true);
      }
    } catch (error) {
      console.error('Error playing track:', error);
    }
  }

  pauseTrack() {
    this.audio.pause();
    this.isPlayingSubject.next(false);
  }

  resumeTrack() {
    this.audio.play();
    this.isPlayingSubject.next(true);
  }

  nextTrack() {
    const tracks = this.trackListSubject.value;
    if (tracks.length === 0) return;

    this.currentTrackIndex = (this.currentTrackIndex + 1) % tracks.length;
    const nextTrack = tracks[this.currentTrackIndex];
    this.playTrack(nextTrack);
  }

  prevTrack() {
    const tracks = this.trackListSubject.value;
    if (tracks.length === 0) return;

    this.currentTrackIndex = (this.currentTrackIndex - 1 + tracks.length) % tracks.length;
    const prevTrack = tracks[this.currentTrackIndex];
    this.playTrack(prevTrack);
  }

  setVolume(value: number) {
    this.audio.volume = value;
  }

  getCurrentTime(): number {
    return this.audio.currentTime;
  }

  getDuration(): number {
    return this.audio.duration;
  }

  setCurrentTime(value: number) {
    this.audio.currentTime = value;
  }
   seek(time: number) {
    if (this.audio && !isNaN(time) && isFinite(time)) {
      this.audio.currentTime = time;
    }
  }
}