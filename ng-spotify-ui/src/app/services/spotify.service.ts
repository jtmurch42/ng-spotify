import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

import { AccessToken } from '../models/access-token.model';
import { Artists, ArtistInfo } from '../models/artists.model';
import { Albums } from '../models/albums.model';
import { TopTracks } from '../models/top-tracks.model';
import { RelatedArtists } from '../models/related-artists.model';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  constructor(private http: HttpClient) {}

  accessToken(): Observable<AccessToken> {
    return this.http.get<AccessToken>('/api/token');
  }

  getArtists(artistName: string): Observable<Artists> {
    const httpOptions = {
      params: new HttpParams().set('q', artistName).set('type', 'artist').set('limit', '50')
    };
    return this.http.get<Artists>('https://api.spotify.com/v1/search', httpOptions);
  }

  getArtistDetails(artistId: string): Observable<[ArtistInfo, Albums, TopTracks, RelatedArtists]> {
    const artistInfo$ = this.getArtistInfo(artistId);
    const albums$ = this.getAlbums(artistId, '4');
    const tracks$ = this.getTopTracks(artistId);
    const relatedArtists$ = this.getRelatedArtists(artistId);
    return forkJoin(artistInfo$, albums$, tracks$, relatedArtists$);
  }

  getArtistInfo(artistId: string): Observable<ArtistInfo> {
    return this.http.get<ArtistInfo>(`https://api.spotify.com/v1/artists/${artistId}`);
  }

  getAlbums(artistId: string, limit: string): Observable<Albums> {
    const httpOptions = { params: new HttpParams().set('limit', limit) };
    return this.http.get<Albums>(`https://api.spotify.com/v1/artists/${artistId}/albums`, httpOptions);
  }

  getTopTracks(artistId: string): Observable<TopTracks> {
    const httpOptions = { params: new HttpParams().set('country', 'US') };
    return this.http.get<TopTracks>(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, httpOptions);
  }

  getRelatedArtists(artistId: string): Observable<RelatedArtists> {
    return this.http.get<RelatedArtists>(`https://api.spotify.com/v1/artists/${artistId}/related-artists`);
  }
}
