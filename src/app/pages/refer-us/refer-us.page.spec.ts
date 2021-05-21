import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReferUsPage } from './refer-us.page';

describe('ReferUsPage', () => {
  let component: ReferUsPage;
  let fixture: ComponentFixture<ReferUsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferUsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReferUsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
