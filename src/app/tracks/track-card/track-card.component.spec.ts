import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackCardComponent } from './track-card.component';
import { Track } from '../../models/track.model';

describe('TrackCardComponent', () => {
  let component: TrackCardComponent;
  let fixture: ComponentFixture<TrackCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackCardComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(TrackCardComponent);
    component = fixture.componentInstance;

    // Créer un objet 'track' complet sans utiliser 'Partial'
    component.index = 1;
    component.track = {
      id: '1',
      title: 'Test Track',
      artist: 'Artist',
      duration: '12:12', // Exemple
      category: 'Pop', // Exemple
      createdAt: new Date(),
      audio: new Blob() // Exemple
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format index correctly', () => {
    expect(component.formatIndex(component.index)).toBe('01');
  });
});
