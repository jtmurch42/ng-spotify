import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';

import { AlbumComponent } from './album.component';
import { SpotifyService } from '../../services/spotify.service';
import { Album } from '../../models/album.model';

describe('AlbumComponent', () => {
  let component: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;
  let mockSpotifyService: jasmine.SpyObj<SpotifyService>;
  let mockAlbum: Album;

  beforeEach(async(() => {
    mockSpotifyService = jasmine.createSpyObj('SpotifyService', ['getAlbum']);

    TestBed.configureTestingModule({
      declarations: [AlbumComponent],
      providers: [
        { provide: SpotifyService, useValue: mockSpotifyService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ albumId: '1234' })
            }
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    mockAlbum = {
      album_type: 'album',
      artists: [
        {
          external_urls: { spotify: 'https://open.spotify.com/artist/1234' },
          href: 'https://api.spotify.com/v1/artists/1234',
          id: '1234',
          name: 'Artist 1',
          type: 'artist',
          uri: 'spotify:artist:1234'
        }
      ],
      available_markets: [],
      copyrights: [{ text: '2020', type: 'C' }],
      external_ids: { upc: '4050538304114' },
      external_urls: { spotify: 'https://open.spotify.com/album/45678' },
      genres: [],
      href: 'https://api.spotify.com/v1/albums/45678',
      id: '45678',
      images: [
        {
          height: 640,
          url: null,
          width: 640
        }
      ],
      label: 'Test Label',
      name: 'Song 1',
      popularity: 62,
      release_date: '2017-06-16',
      release_date_precision: 'day',
      total_tracks: 11,
      tracks: {
        href: 'https://api.spotify.com/v1/albums/1234/tracks?offset=0&limit=50',
        items: [
          {
            artists: [
              {
                external_urls: { spotify: 'https://open.spotify.com/artist/9876454' },
                href: 'https://api.spotify.com/v1/artists/9876454',
                id: '9876454',
                name: 'Artist 1',
                type: 'artist',
                uri: 'spotify:artist:9876454'
              }
            ],
            available_markets: [],
            disc_number: 1,
            duration_ms: 302135,
            explicit: false,
            external_urls: { spotify: 'https://open.spotify.com/track/201319190' },
            href: 'https://api.spotify.com/v1/tracks/201319190',
            id: '201319190',
            is_local: false,
            name: 'Album 1',
            preview_url: null,
            track_number: 1,
            type: 'track',
            uri: 'spotify:track:1111111'
          }
        ],
        limit: 50,
        next: null,
        offset: 0,
        previous: null,
        total: 1
      },
      type: 'album',
      uri: 'spotify:album:0498193i1203'
    };
    fixture = TestBed.createComponent(AlbumComponent);
    component = fixture.componentInstance;
  });

  it('should get album', () => {
    mockSpotifyService.getAlbum.and.returnValue(of(mockAlbum));

    fixture.detectChanges();

    expect(mockSpotifyService.getAlbum).toHaveBeenCalledWith('1234');
    expect(component.album).toEqual(mockAlbum);
  });

  it('should not get album', () => {
    mockSpotifyService.getAlbum.and.returnValue(throwError('Error getting album test...'));

    fixture.detectChanges();

    const el: HTMLElement = fixture.debugElement.query(By.css('.alert')).nativeElement;
    expect(el.innerText).toContain('An error occurred while getting album data');
    expect(mockSpotifyService.getAlbum).toHaveBeenCalledWith('1234');
    expect(component.album).toBeUndefined();
  });
});
