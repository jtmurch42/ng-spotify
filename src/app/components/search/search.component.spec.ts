import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { SearchComponent } from './search.component';
import { SpotifyService } from '../../services/spotify.service';
import { ErrorMessages } from 'src/app/enums/messages';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockSpotifyService: jasmine.SpyObj<SpotifyService>;

  beforeEach(async(() => {
    mockSpotifyService = jasmine.createSpyObj('SpotifyService ', ['getArtists']);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [SearchComponent],
      providers: [{ provide: SpotifyService, useValue: mockSpotifyService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('onSearch', () => {
    it('should get artists', () => {
      const mockArtists = {
        artists: {
          href: 'https://api.spotify.com/v1/search?query=SomeArtist&type=artist&offset=0&limit=1',
          items: [
            {
              external_urls: { spotify: 'https://open.spotify.com/artist/abcdef' },
              followers: {
                href: null,
                total: 1
              },
              genres: ['rock'],
              href: 'https://api.spotify.com/v1/artists/abcdef',
              id: 'abcdef',
              images: [
                {
                  height: 640,
                  url: 'https://i.scdn.co/image/abc',
                  width: 640
                }
              ],
              name: 'Some Artist',
              popularity: 1,
              type: 'artist',
              uri: 'spotify:artist:abcdef'
            }
          ],
          limit: 1,
          next: 'https://api.spotify.com/v1/search?query=SomeArtist&type=artist&offset=1&limit=1',
          offset: 0,
          previous: null,
          total: 1
        }
      };
      mockSpotifyService.getArtists.and.returnValue(of(mockArtists));
      component.artistName = 'Some Artist';

      component.onSearch();

      expect(mockSpotifyService.getArtists).toHaveBeenCalledWith('Some Artist');
      expect(component.artists).toEqual(mockArtists.artists);
    });

    it('should not get artists', () => {
      component.onSearch();

      expect(mockSpotifyService.getArtists).not.toHaveBeenCalled();
      expect(component.artists).toBeUndefined();
    });

    it('should display error', () => {
      component.artistName = 'Some Artist';
      mockSpotifyService.getArtists.and.returnValue(throwError('Error getting artists'));

      component.onSearch();
      fixture.detectChanges();

      const el: HTMLElement = fixture.debugElement.query(By.css('.alert')).nativeElement;
      expect(el.innerText).toContain(ErrorMessages.LoadDataError);
    });
  });
});
