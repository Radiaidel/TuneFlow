import { TestBed } from '@angular/core/testing';
import { TrackListComponent } from './track-list.component';
import { StoreModule } from '@ngrx/store';
import { trackReducer } from '../../store/reducers/track.reducer.reducer';  // Make sure this points to your store reducers

describe('TrackListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(trackReducer),  // Add the StoreModule here
        TrackListComponent
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TrackListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
