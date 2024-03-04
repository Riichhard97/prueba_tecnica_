import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateArticleComponent } from './new.component';

describe('NewComponent', () => {
  let component: CreateArticleComponent;
  let fixture: ComponentFixture<CreateArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateArticleComponent]
    });
    fixture = TestBed.createComponent(CreateArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});