import { Component, OnInit } from '@angular/core';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-k8s-training',
  templateUrl: './k8s-training.component.html',
  styleUrls: ['./k8s-training.component.css']
})
export class K8sTrainingComponent {
   image: File;
   baseAddress: string;
   base64TextString: any;

   constructor() {

  }

  onImageChanged(event) {
    this.image= event.target.files[0];
    var reader = new FileReader();
    reader.onload =this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.image);
  }

   onUpload( ) {
    this.baseAddress = environment.apiUrl + '/fileUpload';
    //alert(this.base64TextString);

  //   this.http.post('my-backend.com/file-upload', this.image)
  //   .subscribe(...);
  }
 
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64TextString= btoa(binaryString);
    
   }
  
  

}
