import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllEventsPage } from './all-events.page';

describe('AllEventsPage', () => {
  let component: AllEventsPage;
  let fixture: ComponentFixture<AllEventsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllEventsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllEventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
