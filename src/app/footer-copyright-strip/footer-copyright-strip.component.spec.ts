import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCopyrightStripComponent } from './footer-copyright-strip.component';

describe('FooterCopyrightStripComponent', () => {
  let component: FooterCopyrightStripComponent;
  let fixture: ComponentFixture<FooterCopyrightStripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterCopyrightStripComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterCopyrightStripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
