import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerErstellenComponent } from './customer-erstellen.component';

describe('CustomerErstellenComponent', () => {
  let component: CustomerErstellenComponent;
  let fixture: ComponentFixture<CustomerErstellenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerErstellenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerErstellenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
