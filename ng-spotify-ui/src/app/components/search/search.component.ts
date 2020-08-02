import { Component } from '@angular/core';

import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../models/artist.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  artists: ArtistData;
  artistName: string;

  constructor(private spotifyService: SpotifyService) {}

  onSearch(): void {
    if (!this.artistName) {
      return;
    }
    this.spotifyService.searchItem(this.artistName, 'artist').subscribe((res) => {
      this.artists = res.artists;
    });
  }
}
