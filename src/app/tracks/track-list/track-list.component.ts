import { Component, OnDestroy, OnInit } from '@angular/core';
import { Track } from '../../models/track.model';
import { CommonModule, NgForOf } from '@angular/common';
import { IndexedDBService } from '../../services/indexeddb.service';
import { TrackCardComponent } from '../track-card/track-card.component';
import { SearchComponent } from '../../shared/search/search.component';
import { loadTracks , deleteTrack, deleteTrackSuccess, updateTrack,updateTrackSuccess } from '../../store/actions/track.actions.actions';
import { Store } from '@ngrx/store';
import { TrackState } from '../../store/reducers/track.reducer.reducer';
import { TrackFormComponent } from '../track-form/track-form.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [CommonModule, TrackCardComponent, SearchComponent, NgForOf , TrackFormComponent],
  templateUrl: './track-list.component.html',
})
export class TrackListComponent implements OnInit {
  // tracks$ = this.store.select(state => state.track.tracks);
  showEditForm = false;
  selectedTrack: Track | null = null;
  tracks$: Observable<Track[]> = this.store.select('track').pipe(map(state => state.tracks));
  filteredTracks$: Observable<Track[]> = this.tracks$;
  searchTerm: string = '';



  constructor(
    private store: Store<{ track: TrackState }>,
    private indexedDBService: IndexedDBService
  ) {}

  ngOnInit() {
    // this.indexedDBService.getAllTracks().subscribe(tracks => {
    //   this.store.dispatch(loadTracks({ tracks }));
    // });

    this.indexedDBService.getAllTracks().subscribe(tracks => {
      tracks = tracks.filter(track => track.title && track.category);
      this.store.dispatch(loadTracks({ tracks }));
    });
    
  }

  filterTracks(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.filteredTracks$ = this.tracks$.pipe(
      map(tracks => tracks.filter(track => 
        track.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (track.category && track.category.toLowerCase().includes(searchTerm.toLowerCase()))  // Vérification de track.category
      ))
    );
  }


  
  onDeleteTrack(trackId: string) {
    if (confirm('Are you sure you want to delete this track?')) {
      this.store.dispatch(deleteTrack({ trackId }));
      this.indexedDBService.deleteTrack(trackId).subscribe(() => {
        this.store.dispatch(deleteTrackSuccess({ trackId }));
      });
    }
  }

  onEditTrack(track: Track) {
    this.selectedTrack = { ...track };
    this.showEditForm = true;
  }

  onCloseForm() {
    this.showEditForm = false;
    this.selectedTrack = null;
  }

  onUpdateTrack(track: Track) {
    this.store.dispatch(updateTrack({ track }));
    this.indexedDBService.updateTrack(track).subscribe(() => {
      this.store.dispatch(updateTrackSuccess({ track }));
      this.onCloseForm();
    });
    }


  
}