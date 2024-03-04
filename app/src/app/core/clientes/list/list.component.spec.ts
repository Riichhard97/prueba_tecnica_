import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CilenteListComponent } from './list.component';

describe('ListComponent', () => {
  let component: CilenteListComponent;
  let fixture: ComponentFixture<CilenteListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CilenteListComponent]
    });
    fixture = TestBed.createComponent(CilenteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
