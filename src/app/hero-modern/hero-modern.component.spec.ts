import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroModernComponent } from './hero-modern.component';

describe('HeroModernComponent', () => {
  let component: HeroModernComponent;
  let fixture: ComponentFixture<HeroModernComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroModernComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroModernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
