import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroFullComponent } from './hero-full.component';

describe('HeroFullComponent', () => {
  let component: HeroFullComponent;
  let fixture: ComponentFixture<HeroFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroFullComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
