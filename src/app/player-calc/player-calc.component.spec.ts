import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCalcComponent } from './player-calc.component';

describe('PlayerCalcComponent', () => {
  let component: PlayerCalcComponent;
  let fixture: ComponentFixture<PlayerCalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerCalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
