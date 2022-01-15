import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarComponent } from './progress-bar.component';
import { LoaderService } from '../../services/loader.service';

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;
  let loaderService: LoaderService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressBarComponent],
      providers: [LoaderService]
    }).compileComponents();

    loaderService = TestBed.inject(LoaderService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not show progress bar to start', () => {
    const el = fixture.nativeElement.querySelector('.progress-bar');
    expect(el).toBeFalsy();
  });

  it('should show progress bar', () => {
    loaderService.show();

    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('.progress-bar');
    expect(el).toBeTruthy();
  });
});
