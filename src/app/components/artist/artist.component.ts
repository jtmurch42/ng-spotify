import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ArtistInfo } from './../../models/artists.model';
import { AlbumItem } from '../../models/albums.model';
import { TopTrack } from '../../models/top-tracks.model';
import { RelatedArtist } from '../../models/related-artists.model';
import { SpotifyService } from '../../services/spotify.service';
import { ErrorMessages } from 'src/app/enums/messages';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  artistId: string;
  artistInfo: ArtistInfo;
  albums: AlbumItem[];
  moreAlbums: AlbumItem[];
  showMoreAlbums: boolean;
  topTracks: TopTrack[];
  relatedArtists: RelatedArtist[];
  errorMsg: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loaderService.show();
    this.activatedRoute.paramMap.subscribe((res) => {
      this.errorMsg = null;
      this.moreAlbums = null;
      this.showMoreAlbums = false;
      this.artistId = res.get('artistId');
      this.getDetails(this.artistId);
    });
  }

  viewMoreAlbums(): void {
    this.showMoreAlbums = true;

    if (this.moreAlbums) {
      return;
    }

    this.spotifyService.getAlbums(this.artistId, '8', '10').subscribe((res) => {
      this.moreAlbums = res.items;
    });
  }

  viewLessAlbums(): void {
    this.showMoreAlbums = false;
  }

  private getDetails(artistId: string): void {
    this.spotifyService.getArtistDetails(artistId, '0', '8').subscribe(
      ([artistInfo, albums, topTracks, relatedArtists]) => {
        this.artistInfo = artistInfo;
        this.albums = albums.items;
        this.topTracks = topTracks.tracks;
        this.relatedArtists = relatedArtists.artists;
        this.loaderService.hide();
      },
      () => {
        this.errorMsg = ErrorMessages.LoadDataError;
        this.loaderService.hide();
      }
    );
  }
}
