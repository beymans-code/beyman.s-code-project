import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicControlTextComponent } from './dynamic-control-text.component';

describe('DynamicControlTextComponent', () => {
  let component: DynamicControlTextComponent;
  let fixture: ComponentFixture<DynamicControlTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicControlTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicControlTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
