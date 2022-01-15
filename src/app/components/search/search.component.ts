import { Component } from '@angular/core';

import { SpotifyService } from '../../services/spotify.service';
import { LoaderService } from '../../services/loader.service';
import { Artist } from '../../models/artists.model';
import { ErrorMessages } from '../../enums/messages';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  artists: Artist;
  artistName: string;
  errorMsg: string;

  constructor(private spotifyService: SpotifyService, private loaderService: LoaderService) {}

  onSearch(): void {
    this.errorMsg = null;

    if (!this.artistName) {
      return;
    }

    this.loaderService.show();

    this.spotifyService.getArtists(this.artistName).subscribe(
      (res) => {
        this.artists = res.artists;
        this.loaderService.hide();
      },
      () => {
        this.errorMsg = ErrorMessages.LoadDataError;
        this.loaderService.hide();
      }
    );
  }
}
