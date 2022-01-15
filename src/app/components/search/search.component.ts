import { Component } from '@angular/core';

import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../models/artists.model';
import { ErrorMessages } from 'src/app/enums/messages';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  artists: Artist;
  artistName: string;
  errorMsg: string;

  constructor(private spotifyService: SpotifyService) {}

  onSearch(): void {
    this.errorMsg = null;

    if (!this.artistName) {
      return;
    }

    this.spotifyService.getArtists(this.artistName).subscribe(
      (res) => {
        this.artists = res.artists;
      },
      () => {
        this.errorMsg = ErrorMessages.LoadDataError;
      }
    );
  }
}
