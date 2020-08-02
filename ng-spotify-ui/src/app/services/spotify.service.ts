import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Artists } from '../models/artist.model';
import { AccessToken } from './../models/access-token.model';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  constructor(private http: HttpClient) {}

  searchItem(item: string, type: string): Observable<Artists> {
    const httpOptions = {
      params: new HttpParams().set('q', item).set('type', type).set('limit', '50')
    };
    return this.http.get<Artists>('https://api.spotify.com/v1/search', httpOptions);
  }

  accessToken(): Observable<AccessToken> {
    return this.http.get<AccessToken>('/api/token');
  }
}
