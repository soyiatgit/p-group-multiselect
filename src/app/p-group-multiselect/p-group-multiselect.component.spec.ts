import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PGroupMultiselectComponent } from './p-group-multiselect.component';

describe('PGroupMultiselectComponent', () => {
  let component: PGroupMultiselectComponent;
  let fixture: ComponentFixture<PGroupMultiselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PGroupMultiselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PGroupMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
