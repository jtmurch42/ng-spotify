import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SpotifyService } from '../../services/spotify.service';
import { LoaderService } from '../../services/loader.service';
import { Album } from '../../models/album.model';
import { ErrorMessages } from '../../enums/messages';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  album: Album;
  errorMsg: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loaderService.show();
    const albumId = this.activatedRoute.snapshot.paramMap.get('albumId');
    this.getAlbum(albumId);
  }

  private getAlbum(albumId: string) {
    this.spotifyService.getAlbum(albumId).subscribe(
      (res) => {
        this.album = res;
        this.loaderService.hide();
      },
      () => {
        this.errorMsg = ErrorMessages.LoadDataMsg;
        this.loaderService.hide();
      }
    );
  }
}
