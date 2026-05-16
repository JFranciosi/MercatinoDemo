import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketDetails } from './market-details';

describe('MarketDetails', () => {
  let component: MarketDetails;
  let fixture: ComponentFixture<MarketDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
