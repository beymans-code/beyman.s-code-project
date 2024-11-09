import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedListCardComponent } from './shared-list-card.component';

describe('SharedListCardComponent', () => {
  let component: SharedListCardComponent;
  let fixture: ComponentFixture<SharedListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedListCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
