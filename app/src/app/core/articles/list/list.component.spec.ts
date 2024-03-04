import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ArticleListComponent;
  let fixture: ComponentFixture<ArticleListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleListComponent]
    });
    fixture = TestBed.createComponent(ArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
