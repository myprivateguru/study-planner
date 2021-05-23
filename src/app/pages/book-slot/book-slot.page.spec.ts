import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookSlotPage } from './book-slot.page';

describe('BookSlotPage', () => {
  let component: BookSlotPage;
  let fixture: ComponentFixture<BookSlotPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookSlotPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookSlotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
