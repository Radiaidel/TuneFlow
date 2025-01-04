import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AudioPlayerComponent } from './audio-player/audio-player/audio-player.component';
import { LibraryComponent } from './library/library.component';

export const routes: Routes = [
    { path: 'home' , component: LibraryComponent},
    { path:'play' , component: AudioPlayerComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' } 
];
