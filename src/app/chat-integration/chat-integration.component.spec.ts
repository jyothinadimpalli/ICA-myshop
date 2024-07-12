import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatIntegrationComponent } from './chat-integration.component';

describe('ChatIntegrationComponent', () => {
  let component: ChatIntegrationComponent;
  let fixture: ComponentFixture<ChatIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatIntegrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
