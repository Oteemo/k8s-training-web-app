import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { K8sTrainingComponent } from './training/k8s-training/k8s-training.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    K8sTrainingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [K8sTrainingComponent]
})
export class AppModule { }
