import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawleredListComponent } from './crawlered-list.component';

describe('CrawleredListComponent', () => {
  let component: CrawleredListComponent;
  let fixture: ComponentFixture<CrawleredListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrawleredListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawleredListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
