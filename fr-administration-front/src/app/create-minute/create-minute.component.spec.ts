import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMinuteComponent } from './create-minute.component';

describe('CreateMinuteComponent', () => {
  let component: CreateMinuteComponent;
  let fixture: ComponentFixture<CreateMinuteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMinuteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMinuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
