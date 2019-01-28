import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule} from  '@angular/common/http';
import { K8sTrainingComponent } from './k8s-training.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
describe('K8sTrainingComponent', () => {
  let component: K8sTrainingComponent;
  let component2: Ng4LoadingSpinnerService;
  let fixture: ComponentFixture<K8sTrainingComponent>;
  let fixture2: ComponentFixture<Ng4LoadingSpinnerService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ K8sTrainingComponent, Ng4LoadingSpinnerService ],
      imports: [
        HttpClientModule,
    ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(K8sTrainingComponent);
    fixture2 = TestBed.createComponent(Ng4LoadingSpinnerService);
    component = fixture.componentInstance;
    component2 = fixture2.componentInstance;
    fixture2.detectChanges();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should convert the image to base64 string', () => {
    var mockValue = createMockObject();
    spyOn(component, 'imageConversion').and.callThrough();
    component.imageConversion(mockValue);
    expect(component.imageConversion).toHaveBeenCalled();
  });

  it('should try to submit without uploading an image', () => {
    spyOn(window, 'alert');
    component.uploadImage();
    expect(window.alert).toHaveBeenCalledWith('Please upload an image and try again.');
  });

  //Helper Functions
  function createMockObject() { 
    let mockObject =  {
       target:  { 
         result: 'test'
       }
    }
    return mockObject;
  }
  
});
