import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostumerDashboardComponent } from './costumer-dashboard.component';

describe('CostumerDashboardComponent', () => {
  let component: CostumerDashboardComponent;
  let fixture: ComponentFixture<CostumerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CostumerDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostumerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
