import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingOverviewPageComponent } from './reading-overview-page.component';

describe('ReadingOverviewPageComponent', () => {
  let component: ReadingOverviewPageComponent;
  let fixture: ComponentFixture<ReadingOverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadingOverviewPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
