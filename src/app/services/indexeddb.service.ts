import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Track } from '../models/track.model';
import { AudioFile } from '../models/audioFile.model';


interface TrackDB extends DBSchema {
  tracks: {
    key: string;
    value: Track;
    indexes: { 'by-date': Date };
  };
  audioFiles: {
    key: string;
    value: AudioFile;
  };
}

@Injectable({
  providedIn: 'root',
})
export class IndexedDBService {

  private dbPromise: Promise<IDBPDatabase<TrackDB>>;

  constructor() {
    this.dbPromise = openDB<TrackDB>('track-db', 1, {
      upgrade(db) {
        const trackStore = db.createObjectStore('tracks', {
          keyPath: 'id',
        });
        trackStore.createIndex('by-date', 'createdAt');

        db.createObjectStore('audioFiles', {
          keyPath: 'id',
        });
      },
    });
  }





  addTrack(track: Track): Observable<Track> {
    return from(
      this.dbPromise.then(async (db) => {
        const tx = db.transaction(['tracks', 'audioFiles'], 'readwrite');
        const trackStore = tx.objectStore('tracks');
        const audioFileStore = tx.objectStore('audioFiles');

        if (!track.id) {
          track.id = Math.random().toString(36).substring(2);
        }

        console.log('Audio Blob:', track.audio);
        await trackStore.add(track);
        await audioFileStore.add({ id: track.id, audio: track.audio });

        const result = await audioFileStore.get(track.id) as AudioFile;
        console.log('Retrieved data:', result);
        console.log('File type:', result.audio?.type);

        await tx.done;
        return track;
      })
    );
  }


  deleteTrack(trackId: string): Observable<void> {
    return from(
      this.dbPromise.then(async (db) => {
        const tx = db.transaction(['tracks', 'audioFiles'], 'readwrite');
        const trackStore = tx.objectStore('tracks');
        const audioStore = tx.objectStore('audioFiles');
        
        await trackStore.delete(trackId);
        await audioStore.delete(trackId);
        await tx.done;
      })
    );
  }
  
  updateTrack(track: Track): Observable<Track> {
    return from(
      this.dbPromise.then(async (db) => {
        const tx = db.transaction(['tracks'], 'readwrite');
        const trackStore = tx.objectStore('tracks');
        await trackStore.put(track);
        await tx.done;
        return track;
      })
    );
  }



  getAllTracks(): Observable<Track[]> {
    return from(
      this.dbPromise.then(async (db) => {
        const tx = db.transaction('tracks', 'readonly');
        const store = tx.objectStore('tracks');
        return store.getAll();
      })
    );
  }

  
  getAudioFile(trackId: string): Observable<AudioFile | undefined> {
    return from(
      this.dbPromise.then(async (db) => {
        const tx = db.transaction('audioFiles', 'readonly');
        const audioFileStore = tx.objectStore('audioFiles');
        return await audioFileStore.get(trackId);
      })
    );
  }

}