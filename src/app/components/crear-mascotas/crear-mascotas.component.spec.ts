import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearMascotasComponent } from './crear-mascotas.component';

describe('CrearMascotasComponent', () => {
  let component: CrearMascotasComponent;
  let fixture: ComponentFixture<CrearMascotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearMascotasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearMascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
