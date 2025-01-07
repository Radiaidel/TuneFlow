import { Component, OnDestroy, OnInit } from '@angular/core';
import { Track } from '../../models/track.model';
import { CommonModule, NgForOf } from '@angular/common';
import { IndexedDBService } from '../../services/indexeddb.service';
import { TrackCardComponent } from '../track-card/track-card.component';
import { SearchComponent } from '../../shared/search/search.component';
import { loadTracks } from '../../store/actions/track.actions.actions';
import { Store } from '@ngrx/store';
import { TrackState } from '../../store/reducers/track.reducer.reducer';

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [CommonModule, TrackCardComponent, SearchComponent, NgForOf],
  templateUrl: './track-list.component.html',
})
export class TrackListComponent implements OnInit {
  tracks$ = this.store.select(state => state.track.tracks);

  constructor(
    private store: Store<{ track: TrackState }>,
    private indexedDBService: IndexedDBService
  ) {}

  ngOnInit() {
    this.indexedDBService.getAllTracks().subscribe(tracks => {
      this.store.dispatch(loadTracks({ tracks }));
    });
  }

  deleteTrack(id: string) {
    // this.indexedDBService.deleteTrack(id).subscribe({
    //   next: () => {
    //     this.store.dispatch(deleteTrack({ id }));
    //   },
    //   error: (error) => {
    //     console.error('Error deleting track', error);
    //   }
    // });
  }
  editTrack(event: Track) {
    // this.indexedDBService.getTrack(id).subscribe({
    //   next: (track) => {
    //     this.store.dispatch(updateTrack({ track }));
    //   },
    //   error: (error) => {
    //     console.error('Error updating track', error);
    //   }
  }
  
}