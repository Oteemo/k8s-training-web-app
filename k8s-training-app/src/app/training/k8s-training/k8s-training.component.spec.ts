import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { K8sTrainingComponent } from './k8s-training.component';

describe('K8sTrainingComponent', () => {
  let component: K8sTrainingComponent;
  let fixture: ComponentFixture<K8sTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ K8sTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(K8sTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
