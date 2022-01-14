import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of, throwError } from 'rxjs';

import { SpotifyService } from '../../services/spotify.service';
import { ArtistComponent } from './artist.component';

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
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistComponent);
    component = fixture.componentInstance;
  });

  it('make call to get artist details', () => {
    mockSpotifyService.getArtistDetails.and.returnValue(
      of([null, { items: null }, { traks: null }, { artists: null }] as any)
    );

    fixture.detectChanges();

    expect(mockSpotifyService.getArtistDetails).toHaveBeenCalledWith('1234', '0', '8');
  });

  it('should make call to get artists and display error', () => {
    mockSpotifyService.getArtistDetails.and.returnValue(throwError('Error...'));

    fixture.detectChanges();

    const el: HTMLElement = fixture.debugElement.query(By.css('.alert')).nativeElement;
    expect(el.innerText).toContain('An error occurred while getting data');
    expect(mockSpotifyService.getArtistDetails).toHaveBeenCalledWith('1234', '0', '8');
  });

  it('should make call to get albums', () => {
    mockSpotifyService.getArtistDetails.and.returnValue(
      of([null, { items: null }, { traks: null }, { artists: null }] as any)
    );
    mockSpotifyService.getAlbums.and.returnValue(of({ items: null } as any));
    fixture.detectChanges();

    component.viewMoreAlbums();

    expect(mockSpotifyService.getAlbums).toHaveBeenCalledWith('1234', '8', '50');
  });

  it('should make call to get albums and display error', () => {
    mockSpotifyService.getArtistDetails.and.returnValue(
      of([null, { items: null }, { traks: null }, { artists: null }] as any)
    );
    mockSpotifyService.getAlbums.and.returnValue(throwError('Error...'));
    fixture.detectChanges();

    component.viewMoreAlbums();
    fixture.detectChanges();

    const el: HTMLElement = fixture.debugElement.query(By.css('.alert')).nativeElement;
    expect(el.innerText).toContain('An error occurred while getting data');
    expect(mockSpotifyService.getAlbums).toHaveBeenCalledWith('1234', '8', '50');
  });

  it('should make changes to view less albums', () => {
    const spy = spyOn(window, 'scrollTo');
    component.showMoreAlbums = true;

    component.viewLessAlbums();

    expect(spy.calls.all()[0].args).toEqual([0, 130]);
    expect(component.showMoreAlbums).toBe(false);
  });
});
