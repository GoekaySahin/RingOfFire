import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameInfpComponent } from './game-info.component';

describe('GameInfpComponent', () => {
  let component: GameInfpComponent;
  let fixture: ComponentFixture<GameInfpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameInfpComponent],
    });
    fixture = TestBed.createComponent(GameInfpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
