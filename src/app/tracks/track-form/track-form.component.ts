import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { IndexedDBService } from '../../services/indexeddb.service';
import { Store } from '@ngrx/store';
import { Track,MusicCategory } from '../../models/track.model';
import { addTrack } from '../../store/actions/track.actions.actions';

@Component({
  selector: 'app-track-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf],
  templateUrl: './track-form.component.html',
  styleUrls: ['./track-form.component.scss']
})
export class TrackFormComponent  {
  trackForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  audioFileName: string = '';
  audioBlob: Blob | null = null;
  audioUrl: string | null = null;   
  @Output() formVisibilityChange = new EventEmitter<boolean>();
  @Output() submitFormEdit: EventEmitter<Track> = new EventEmitter<Track>();


  @Input() trackToEdit: Track | null = null;
  @Output() onCloseForm = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<Track>();
  

  constructor(
    private fb: FormBuilder, 
    private store: Store, 
    private indexedDBService: IndexedDBService
  ) {
    this.trackForm = this.fb.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      genre: ['', Validators.required],
    });
  }
  

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result ;
      };
      reader.readAsDataURL(file);
    }
  }

  onAudioSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.audioFileName = file.name;
      
      this.audioBlob = file.slice(0, file.size, file.type);
      
      if (this.audioUrl) {
        URL.revokeObjectURL(this.audioUrl);
      }
      this.audioUrl = URL.createObjectURL(this.audioBlob as Blob);
      
      console.log('Audio file selected:', {
        name: this.audioFileName,
        type: file.type,
        size: file.size,
        blob: this.audioBlob
      });
    }
  }
  
  async onSubmit(): Promise<void> {
    if (this.trackForm.valid && this.audioBlob) {
      const { title, artist, genre } = this.trackForm.value;
      const duration = await this.calculateDuration(this.audioBlob);
      const newTrack: Track = {
        id: Math.random().toString(36).substring(2),
        title,
        artist,
        description: 'Some description',
        duration,
        category: MusicCategory[genre.toUpperCase() as keyof typeof MusicCategory],
        createdAt: new Date(),
        audio: this.audioBlob,
        coverImage: this.imagePreview as string,
      };

      this.indexedDBService.addTrack(newTrack).subscribe({
        next: (savedTrack) => {
          this.store.dispatch(addTrack({ track: savedTrack }));
          this.resetForm();
        },
        error: (error) => {
          console.error('Error saving track', error);
        },
      });
    }
  }

  private resetForm(): void {
    this.trackForm.reset();
    this.imagePreview = null;
    this.audioFileName = '';
    this.audioBlob = null;
    this.closeForm();
  }

  closeForm(): void {
    this.formVisibilityChange.emit(false);
  }

  private calculateDuration(audioBlob: Blob): Promise<string> {
    return new Promise((resolve) => {
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.addEventListener('loadedmetadata', () => {
        const minutes = Math.floor(audio.duration / 60);
        const seconds = Math.floor(audio.duration % 60);
        URL.revokeObjectURL(audioUrl);
        resolve(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      });
      
      audio.addEventListener('error', () => {
        URL.revokeObjectURL(audioUrl);
        resolve('0:00');
      });
    });
  }

  onSubmitEdit(): void {
    if (this.trackToEdit) {
      this.submitFormEdit.emit(this.trackToEdit);
    }
  }

  onClose(): void {
    this.onCloseForm.emit();
  }
}