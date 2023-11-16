import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGptBotComponent } from './chat-gpt-bot.component';

describe('ChatGptBotComponent', () => {
  let component: ChatGptBotComponent;
  let fixture: ComponentFixture<ChatGptBotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatGptBotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatGptBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
