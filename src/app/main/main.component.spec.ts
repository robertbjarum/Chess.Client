import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationService } from '@kognifai/poseidon-ng-navigationservice';
import { ToolsMenuService } from '@kognifai/poseidon-ng-toolsmenuservice';
import { SidebarsVisibilityService } from '@kognifai/poseidon-sidebar-visibilityservice';
import { MessageModule } from '@kognifai/poseidon-ng-message-component';
import { MessageService } from '@kognifai/poseidon-message-service';
import { MainComponent } from './main.component';

describe('BodyComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  const toolsMenuServiceStub: ToolsMenuService = {
    items: [],
    register: (items) => { },
    clear: () => { }
  };

  const sidebarsVisibilityServiceStub: SidebarsVisibilityService = new SidebarsVisibilityService();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MessageModule],
      declarations: [MainComponent],
      providers: [
        { provide: ToolsMenuService, useValue: toolsMenuServiceStub },
        { provide: SidebarsVisibilityService, useValue: sidebarsVisibilityServiceStub },
        NavigationService,
        MessageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
