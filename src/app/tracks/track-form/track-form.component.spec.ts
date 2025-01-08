import { TestBed } from '@angular/core/testing';
import { AppComponent } from '../../app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { TrackFormComponent } from './track-form.component';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store'; // Import StoreModule

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterTestingModule,
        NavbarComponent,
        TrackFormComponent,
        CommonModule,
        StoreModule.forRoot({}) // Provide StoreModule with an empty reducer
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'TuneFlow' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('TuneFlow');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // Ensure change detection runs
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, TuneFlow');
  });
});
