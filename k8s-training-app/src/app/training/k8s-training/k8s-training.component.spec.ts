import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule} from  '@angular/common/http';
import { K8sTrainingComponent } from './k8s-training.component';
import { Ng4LoadingSpinnerModule} from 'ng4-loading-spinner';

describe('K8sTrainingComponent', () => {
  let component: K8sTrainingComponent;
  let fixture: ComponentFixture<K8sTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ K8sTrainingComponent ], 
      imports: [
        HttpClientModule,
        Ng4LoadingSpinnerModule
    ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(K8sTrainingComponent);
    component = fixture.componentInstance;
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
