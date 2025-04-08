import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTopStripComponent } from './header-top-strip.component';

describe('HeaderTopStripComponent', () => {
  let component: HeaderTopStripComponent;
  let fixture: ComponentFixture<HeaderTopStripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderTopStripComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderTopStripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
