import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationModifyMemberComponent } from './association-modify-member.component';

describe('AssociationModifyMemberComponent', () => {
  let component: AssociationModifyMemberComponent;
  let fixture: ComponentFixture<AssociationModifyMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociationModifyMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationModifyMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
