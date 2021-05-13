import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieViewerPageComponent } from './movie-viewer-page.component';

describe('MovieViewerPageComponent', () => {
  let component: MovieViewerPageComponent;
  let fixture: ComponentFixture<MovieViewerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieViewerPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieViewerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
