import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryComponent } from './library.component';
import { provideMockStore } from '@ngrx/store/testing';  // Importer provideMockStore

describe('LibraryComponent', () => {
  let component: LibraryComponent;
  let fixture: ComponentFixture<LibraryComponent>;

  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryComponent],
      providers: [
        provideMockStore({ initialState })  // Ajouter le mock du store
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
