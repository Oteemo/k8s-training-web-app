import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { K8sTrainingComponent } from './training/k8s-training/k8s-training.component';

@NgModule({
  declarations: [
    AppComponent,
    K8sTrainingComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
