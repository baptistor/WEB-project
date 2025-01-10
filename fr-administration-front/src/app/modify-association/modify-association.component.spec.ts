import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyAssociationComponent } from './modify-association.component';

describe('ModifyAssociationComponent', () => {
  let component: ModifyAssociationComponent;
  let fixture: ComponentFixture<ModifyAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyAssociationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
