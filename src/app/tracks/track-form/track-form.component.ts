import { Component, OnInit } from '@angular/core';
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
  
  onSubmit(): void {
    if (this.trackForm.valid && this.audioBlob) {
      const { title, artist, genre } = this.trackForm.value;
      const newTrack: Track = {
        id: Math.random().toString(36).substring(2), 
        title,
        artist,
        description: 'Some description',
        duration: '4:00',
        category: MusicCategory[genre.toUpperCase() as keyof typeof MusicCategory],
        createdAt: new Date(),
        audio: this.audioBlob,
        coverImage: this.imagePreview as string,
      };

      this.store.dispatch(addTrack({ track: newTrack }));

      this.indexedDBService.addTrack(newTrack).subscribe({
        next: (track) => {
          console.log('Track saved to IndexedDB', track);
        },
        error: (error) => {
          console.error('Error saving track to IndexedDB', error);
        },
      });

      this.trackForm.reset();
      this.imagePreview = null;
      this.audioFileName = '';
      this.audioBlob = null;
    }
  }

  closeForm(): void {
    this.formVisibilityChange.emit(false);
  }

}