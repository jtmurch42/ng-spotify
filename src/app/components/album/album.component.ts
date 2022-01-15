import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SpotifyService } from '../../services/spotify.service';
import { Album } from '../../models/album.model';
import { ErrorMessages } from 'src/app/enums/messages';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  album: Album;
  errorMsg: string;

  constructor(private activatedRoute: ActivatedRoute, private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    const albumId = this.activatedRoute.snapshot.paramMap.get('albumId');
    this.getAlbum(albumId);
  }

  private getAlbum(albumId: string) {
    this.spotifyService.getAlbum(albumId).subscribe(
      (res) => {
        this.album = res;
      },
      () => {
        this.errorMsg = ErrorMessages.LoadDataError;
      }
    );
  }
}
