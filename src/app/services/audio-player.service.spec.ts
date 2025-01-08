import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AudioPlayerService } from './audio-player.service';
import { IndexedDBService } from './indexeddb.service';
import { Track } from '../models/track.model';
import { of, firstValueFrom } from 'rxjs';

describe('AudioPlayerService', () => {
  let service: AudioPlayerService;
  let indexedDBServiceSpy: jasmine.SpyObj<IndexedDBService>;
  let audioElement: HTMLAudioElement;

  const mockTrack: Track = {
    id: '1',
    title: 'Test Track',
    artist: 'Test Artist',
    duration: '3:30',
    category: 'Test Category',
    createdAt: new Date(),
    audio: new Blob([''], { type: 'audio/mpeg' })
  };

  const mockTracks: Track[] = [
    mockTrack,
    {
      id: '2',
      title: 'Test Track 2',
      artist: 'Test Artist 2',
      duration: '4:00',
      category: 'Test Category',
      createdAt: new Date(),
      audio: new Blob([''], { type: 'audio/mpeg' })
    }
  ];

  beforeEach(() => {
    indexedDBServiceSpy = jasmine.createSpyObj('IndexedDBService', ['getAllTracks', 'getAudioFile']);
    indexedDBServiceSpy.getAllTracks.and.returnValue(of(mockTracks));
    indexedDBServiceSpy.getAudioFile.and.returnValue(of({ id: '1', audio: new Blob([''], { type: 'audio/mpeg' }) }));

    audioElement = document.createElement('audio');
    Object.defineProperties(audioElement, {
      play: {
        value: jasmine.createSpy('play').and.returnValue(Promise.resolve()),
        writable: true
      },
      pause: {
        value: jasmine.createSpy('pause'),
        writable: true
      },
      currentTime: {
        value: 0,
        writable: true
      },
      duration: {
        value: 210,
        writable: true
      },
      volume: {
        value: 1,
        writable: true
      }
    });

    TestBed.configureTestingModule({
      providers: [
        AudioPlayerService,
        { provide: IndexedDBService, useValue: indexedDBServiceSpy }
      ]
    });

    service = TestBed.inject(AudioPlayerService);
    service.audio = audioElement;
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load tracks on initialization', (done) => {
    service.trackList$.subscribe(tracks => {
      expect(tracks).toEqual(mockTracks);
      expect(indexedDBServiceSpy.getAllTracks).toHaveBeenCalled();
      done();
    });
  });

  it('should play track', async () => {
    await service.playTrack(mockTrack);
    
    expect(indexedDBServiceSpy.getAudioFile).toHaveBeenCalledWith(mockTrack.id);
    expect(audioElement.play).toHaveBeenCalled();
    
    service.currentTrack$.subscribe(track => {
      expect(track).toEqual(mockTrack);
    });
    
    service.isPlaying$.subscribe(isPlaying => {
      expect(isPlaying).toBeTrue();
    });
  });

  it('should pause track', () => {
    service.pauseTrack();
    expect(audioElement.pause).toHaveBeenCalled();
    
    service.isPlaying$.subscribe(isPlaying => {
      expect(isPlaying).toBeFalse();
    });
  });

  it('should set volume', () => {
    const testVolume = 0.5;
    service.setVolume(testVolume);
    expect(service.audio.volume).toBe(testVolume);
  });

  it('should get current time', () => {
    const testTime = 30;
    Object.defineProperty(audioElement, 'currentTime', {
      value: testTime,
      writable: true
    });
    expect(service.getCurrentTime()).toBe(testTime);
  });

  it('should get duration', () => {
    expect(service.getDuration()).toBe(210);
  });

  // it('should navigate to next track', async () => {
  //   await service.playTrack(mockTracks[0]); // Commencer par la première piste
    
  //   let initialTrackId: string | undefined;
  //   service.currentTrack$.subscribe(track => {
  //     initialTrackId = track?.id;
  //   });

  //   await service.nextTrack();

  //   service.currentTrack$.subscribe(track => {
  //     expect(track?.id).toBe(mockTracks[1].id);
  //   });
  // });

  // it('should navigate to previous track', async () => {
  //   // D'abord aller à la deuxième piste
  //   await service.playTrack(mockTracks[1]);
    
  //   await service.prevTrack();
    
  //   service.currentTrack$.subscribe(track => {
  //     expect(track?.id).toBe(mockTracks[0].id);
  //   });
  // });

  it('should seek to specific time', () => {
    const testTime = 45;
    service.seek(testTime);
    expect(audioElement.currentTime).toBe(testTime);
  });

  it('should not seek with invalid time', () => {
    const originalTime = audioElement.currentTime;
    service.seek(NaN);
    expect(audioElement.currentTime).toBe(originalTime);
  });

  // it('should handle audio ended event', (done) => {
  //   spyOn(service, 'nextTrack');
  //   service.audio.dispatchEvent(new Event('ended'));
    
  //   setTimeout(() => {
  //     expect(service.nextTrack).toHaveBeenCalled();
  //     done();
  //   });
  // });

  it('should handle audio error event', (done) => {
    service.audio.dispatchEvent(new ErrorEvent('error'));
    
    setTimeout(() => {
      service.isPlaying$.subscribe(isPlaying => {
        expect(isPlaying).toBeFalse();
        done();
      });
    });
  });

  it('should navigate to next track', fakeAsync(async () => {
    await service.playTrack(mockTracks[0]);
    tick();

    service.nextTrack();
    tick();

    const currentTrack = await firstValueFrom(service.currentTrack$);
    expect(currentTrack?.id).toBe('2');
  }));

  it('should navigate to previous track', fakeAsync(async () => {
    await service.playTrack(mockTracks[1]);
    tick();

    service.prevTrack();
    tick();

    const currentTrack = await firstValueFrom(service.currentTrack$);
    expect(currentTrack?.id).toBe('1');
  }));

  it('should handle audio ended event', fakeAsync(() => {
    spyOn(service, 'nextTrack');
    
    // Manually trigger the handleTrackEnded method
    (service as any).handleTrackEnded();
    
    tick();
    expect(service.nextTrack).toHaveBeenCalled();
  }));
  
  
});