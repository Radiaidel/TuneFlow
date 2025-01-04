import { Component, OnInit } from '@angular/core';
import {  Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-track-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf],
  templateUrl: './track-form.component.html',
  styleUrls: ['./track-form.component.scss']
})
export class TrackFormComponent implements OnInit  {
  trackForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  audioFileName: string | null = null;
  @Output() formVisibilityChange = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) {
    this.trackForm = this.fb.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      genre: ['', Validators.required],
      image: [null],
      audio: [null]
    });
  }

  ngOnInit(): void {}

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onAudioSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.audioFileName = file.name;
    }
  }

  closeForm(): void {
    this.formVisibilityChange.emit(false);
  }
}
