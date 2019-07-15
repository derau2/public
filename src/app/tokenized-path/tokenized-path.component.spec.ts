import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenizedPathComponent } from './tokenized-path.component';

describe('TokenizedPathComponent', () => {
  let component: TokenizedPathComponent;
  let fixture: ComponentFixture<TokenizedPathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenizedPathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenizedPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
