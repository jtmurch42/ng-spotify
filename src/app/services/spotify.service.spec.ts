import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SpotifyService } from './spotify.service';
import { environment } from 'src/environments/environment';
import { AccessToken } from '../models/access-token.model';
import { ArtistInfo, Artists } from '../models/artists.model';
import { Albums } from '../models/albums.model';
import { TopTracks } from '../models/top-tracks.model';
import { Album } from '../models/album.model';
import { RelatedArtists } from '../models/related-artists.model';

describe('SpotifyService', () => {
  let service: SpotifyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(SpotifyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getAccessToken', () => {
    it('should return Observable<AccessToken>', (done: DoneFn) => {
      const mockAccessToken: AccessToken = {
        access_token: 'abcdef',
        token_type: 'Bearer',
        expires_in: null,
        scope: null
      };

      service.getAccessToken().subscribe((res) => {
        expect(res).toEqual(mockAccessToken);
        done();
      });

      const req = httpMock.expectOne(`${environment.spotifySearchApiUrl}/spotify-token`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockAccessToken);
    });
  });

  describe('getArtists', () => {
    it('should return Observable<Artists>', (done: DoneFn) => {
      const mockArtists: Artists = {
        artists: {
          href: 'https://api.spotify.com/v1/search?query=someartists&type=artist&offset=0&limit=50',
          items: [
            {
              external_urls: { spotify: 'https://open.spotify.com/artist/1234567' },
              followers: { href: null, total: 1 },
              genres: ['rock'],
              href: 'https://api.spotify.com/v1/artists/1234567',
              id: '1234567',
              images: [
                {
                  height: 640,
                  url: 'https://i.scdn.co/image/someimage8',
                  width: 640
                }
              ],
              name: 'Some Artist',
              popularity: 50,
              type: 'artist',
              uri: 'spotify:artist:1234567'
            }
          ],
          limit: 1,
          next: null,
          offset: 0,
          previous: null,
          total: 1
        }
      };

      service.getArtists('someartist').subscribe((res) => {
        expect(res).toEqual(mockArtists);
        done();
      });

      const expectedUrl = 'https://api.spotify.com/v1/search?q=someartist&type=artist&limit=50';
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(mockArtists);
    });
  });

  describe('getArtistDetails', () => {
    it('should return Observable<[ArtistInfo, Albums, TopTracks, RelatedArtists]>', (done: DoneFn) => {
      const mockArtistInfo: ArtistInfo = {
        external_urls: { spotify: 'https://open.spotify.com/artist/1234' },
        followers: { href: null, total: 1 },
        genres: ['rock'],
        href: 'https://api.spotify.com/v1/artists/1234',
        id: '1234',
        images: [
          {
            height: 640,
            url: null,
            width: 640
          }
        ],
        name: 'Some Artist',
        popularity: 1,
        type: 'artist',
        uri: 'spotify:artist:1234'
      };

      const mockAlbums: Albums = {
        href: 'https://api.spotify.com/v1/artists/1234/albums?offset=0&limit=8',
        items: [
          {
            album_group: 'album',
            album_type: 'album',
            artists: [
              {
                external_urls: { spotify: 'https://open.spotify.com/artist/1234' },
                href: 'https://api.spotify.com/v1/artists/1234',
                id: '1234',
                name: 'Some Artist',
                type: 'artist',
                uri: 'spotify:artist:1234'
              }
            ],
            available_markets: [],
            external_urls: { spotify: 'https://open.spotify.com/album/1234' },
            href: 'https://api.spotify.com/v1/albums/1234',
            id: '1234',
            images: [
              {
                height: 640,
                url: null,
                width: 640
              }
            ],
            name: 'Album 1',
            release_date: '2020-01-30',
            release_date_precision: 'day',
            total_tracks: 11,
            type: 'album',
            uri: 'spotify:album:1234'
          }
        ],
        limit: 1,
        next: 'https://api.spotify.com/v1/artists/1234/albums?offset=8&limit=8',
        offset: 0,
        previous: null,
        total: 1
      };

      const mockTracks: TopTracks = {
        tracks: [
          {
            album: {
              album_type: 'album',
              artists: [
                {
                  external_urls: { spotify: 'https://open.spotify.com/artist/1234' },
                  href: 'https://api.spotify.com/v1/artists/1234',
                  id: '1234',
                  name: 'Artis 1',
                  type: 'artist',
                  uri: 'spotify:artist:1234'
                }
              ],
              external_urls: { spotify: 'https://open.spotify.com/album/5678' },
              href: 'https://api.spotify.com/v1/albums/5678',
              id: '5678',
              images: [
                {
                  height: 640,
                  url: null,
                  width: 640
                }
              ],
              name: 'Album 1',
              release_date: '2001-09-11',
              release_date_precision: 'day',
              total_tracks: 10,
              type: 'album',
              uri: 'spotify:album:5678'
            },
            artists: [
              {
                external_urls: { spotify: 'https://open.spotify.com/artist/123456789' },
                href: 'https://api.spotify.com/v1/artists/123456789',
                id: '123456789',
                name: 'Artist 1',
                type: 'artist',
                uri: 'spotify:artist:123456789'
              }
            ],
            disc_number: 1,
            duration_ms: 9000,
            explicit: false,
            external_ids: { isrc: '123' },
            external_urls: { spotify: 'https://open.spotify.com/track/987654' },
            href: 'https://api.spotify.com/v1/tracks/987654',
            id: '987654',
            is_local: false,
            is_playable: true,
            name: 'Track 1',
            popularity: 10,
            preview_url: null,
            track_number: 1,
            type: 'track',
            uri: 'spotify:track:987654'
          }
        ]
      };

      const mockRelatedArists: RelatedArtists = {
        artists: [
          {
            external_urls: { spotify: 'https://open.spotify.com/artist/47801293293e' },
            followers: {
              href: null,
              total: 1
            },
            genres: ['rock'],
            href: 'https://api.spotify.com/v1/artists/47801293293e',
            id: '47801293293e',
            images: [
              {
                height: 640,
                url: null,
                width: 640
              }
            ],
            name: 'Related Artis 1',
            popularity: 2,
            type: 'artist',
            uri: 'spotify:artist:47801293293e'
          }
        ]
      };

      service.getArtistDetails('123456', '1', '50').subscribe((res) => {
        expect(res[0]).toEqual(mockArtistInfo);
        expect(res[1]).toEqual(mockAlbums);
        expect(res[2]).toEqual(mockTracks);
        expect(res[3]).toEqual(mockRelatedArists);
        done();
      });

      const req1 = httpMock.expectOne('https://api.spotify.com/v1/artists/123456');
      expect(req1.request.method).toEqual('GET');
      req1.flush(mockArtistInfo);

      const req2 = httpMock.expectOne('https://api.spotify.com/v1/artists/123456/albums?offset=1&limit=50');
      expect(req2.request.method).toEqual('GET');
      req2.flush(mockAlbums);

      const req3 = httpMock.expectOne('https://api.spotify.com/v1/artists/123456/top-tracks?country=US');
      expect(req3.request.method).toEqual('GET');
      req3.flush(mockTracks);

      const req4 = httpMock.expectOne('https://api.spotify.com/v1/artists/123456/related-artists');
      expect(req4.request.method).toEqual('GET');
      req4.flush(mockRelatedArists);
    });
  });

  describe('getAlbum', () => {
    it('should return Observable<Album>', (done: DoneFn) => {
      const mockAlbum: Album = {
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

      service.getAlbum('123456').subscribe((res) => {
        expect(res).toEqual(mockAlbum);
        done();
      });

      const req = httpMock.expectOne('https://api.spotify.com/v1/albums/123456');
      expect(req.request.method).toEqual('GET');
      req.flush(mockAlbum);
    });
  });
});
