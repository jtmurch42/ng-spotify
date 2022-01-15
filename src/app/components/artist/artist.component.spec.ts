import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of, throwError } from 'rxjs';

import { ArtistComponent } from './artist.component';
import { SpotifyService } from '../../services/spotify.service';
import { LoaderService } from '../../services/loader.service';
import { ErrorMessages } from '../../enums/messages';

describe('ArtistComponent', () => {
  let component: ArtistComponent;
  let fixture: ComponentFixture<ArtistComponent>;
  let mockSpotifyService: jasmine.SpyObj<SpotifyService>;

  beforeEach(async(() => {
    mockSpotifyService = jasmine.createSpyObj('SpotifyService', ['getArtistDetails', 'getAlbums']);

    TestBed.configureTestingModule({
      declarations: [ArtistComponent],
      providers: [
        { provide: SpotifyService, useValue: mockSpotifyService },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ artistId: '1234' }))
          }
        },
        LoaderService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistComponent);
    component = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should get artist details', () => {
      mockSpotifyService.getArtistDetails.and.returnValue(
        of([null, { items: null }, { tracks: null }, { artists: null }] as any)
      );

      fixture.detectChanges();

      expect(mockSpotifyService.getArtistDetails).toHaveBeenCalledWith('1234', '0', '8');
    });

    it('should display error', () => {
      mockSpotifyService.getArtistDetails.and.returnValue(throwError('Error getting artist details'));

      fixture.detectChanges();

      const el: HTMLElement = fixture.debugElement.query(By.css('.alert')).nativeElement;
      expect(el.innerText).toContain(ErrorMessages.LoadDataError);
      expect(mockSpotifyService.getArtistDetails).toHaveBeenCalledWith('1234', '0', '8');
    });
  });

  describe('viewMoreAlbums', () => {
    it('should get albums', () => {
      mockSpotifyService.getArtistDetails.and.returnValue(
        of([null, { items: null }, { tracks: null }, { artists: null }] as any)
      );
      mockSpotifyService.getAlbums.and.returnValue(of({ items: null } as any));
      fixture.detectChanges();

      component.viewMoreAlbums();

      expect(mockSpotifyService.getAlbums).toHaveBeenCalledWith('1234', '8', '10');
    });
  });

  describe('viewLessAlbums', () => {
    it('should view less albums', () => {
      component.showMoreAlbums = true;

      component.viewLessAlbums();

      expect(component.showMoreAlbums).toBe(false);
    });
  });
});
