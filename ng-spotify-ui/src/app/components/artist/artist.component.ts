import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ArtistInfo } from './../../models/artists.model';
import { AlbumItem } from '../../models/albums.model';
import { TopTrack } from './../../models/top-tracks.model';
import { RelatedArtist } from './../../models/related-artists.model';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  artistInfo: ArtistInfo;
  albums: AlbumItem[];
  topTracks: TopTrack[];
  relatedArtists: RelatedArtist[];
  showError: boolean;

  constructor(private activatedRoute: ActivatedRoute, private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((res) => {
      const artistId = res.get('artistId');
      this.getDetails(artistId);
    });
  }

  private getDetails(artistId: string): void {
    this.spotifyService.getArtistDetails(artistId).subscribe(
      ([artistInfo, albums, topTracks, relatedArtists]) => {
        this.artistInfo = artistInfo;
        this.albums = albums.items;
        this.topTracks = topTracks.tracks;
        this.relatedArtists = relatedArtists.artists;
      },
      () => {
        this.showError = true;
      }
    );
  }
}
