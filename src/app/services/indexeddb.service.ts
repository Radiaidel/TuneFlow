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

  getTracks(): Observable<Track[]> {
    return from(this.dbPromise.then((db) => db.getAll('tracks')));
  }

  getTrackById(id: string): Observable<Track | null> {
    return from(this.dbPromise.then((db) => db.get('tracks', id) as Promise<Track | null>));
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
  

  updateTrack(updatedTrack: Track): Observable<Track> {
    return from(
      this.dbPromise.then(async (db) => {
        const tx = db.transaction(['tracks', 'audioFiles'], 'readwrite');
        const trackStore = tx.objectStore('tracks');
        const audioFileStore = tx.objectStore('audioFiles');

        await trackStore.put(updatedTrack);
        await audioFileStore.put({ id: updatedTrack.id, audio: updatedTrack.audio });

        await tx.done;
        return updatedTrack;
      })
    );
  }

  deleteTrack(id: string): Observable<void> {
    return from(
      this.dbPromise.then(async (db) => {
        const tx = db.transaction(['tracks', 'audioFiles'], 'readwrite');
        const trackStore = tx.objectStore('tracks');
        const audioFileStore = tx.objectStore('audioFiles');

        await trackStore.delete(id);
        await audioFileStore.delete(id);

        await tx.done;
      })
    );
  }
}