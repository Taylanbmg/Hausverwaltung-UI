import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSucheComponent } from './customer-suche.component';

describe('CustomerAnzeigeComponentComponent', () => {
  let component: CustomerSucheComponent;
  let fixture: ComponentFixture<CustomerSucheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerSucheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerSucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
