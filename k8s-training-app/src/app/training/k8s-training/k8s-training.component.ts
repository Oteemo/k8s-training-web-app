import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment as envConfigFile } from '../../../environments/environment';

interface DataResponse {
  image_name: string;
  processed_image: string;
}
@Component({ 
  selector: 'app-k8s-training',
  templateUrl: './k8s-training.component.html',
  styleUrls: ['./k8s-training.component.css']
})

export class K8sTrainingComponent implements OnInit{
   private image: any;
   private imageName: string;
   private baseAddress: string;
   private restApi: string;
   private port: string;
   private base64TextString: any;
   private endpoint: string;
   private environmentContext: string;

   constructor(private http:HttpClient) {

  }
  ngOnInit() {
    this.environmentContext = envConfigFile.settings.environment;
    this.baseAddress =  envConfigFile.settings.baseAddress;
    this.restApi = envConfigFile.settings.apiUrl;
    this.port = envConfigFile.settings.port;
    this.endpoint = this.baseAddress + ':' + this.port + this.restApi;
    this.image = '';
  }

  //reads image, makes call to convert it to base 64 string
  onImageChanged(event) {
    this.image= event.target.files[0];
    this.imageName = this.image.name;
    var reader = new FileReader();
    reader.onload =this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.image);
  }

   //performs post request to endpoint
   uploadImage( ) {
    let data = {
      'encoded_image': this.base64TextString,
      'image_name':this.imageName
    }
      
    this.http.post<DataResponse>(this.endpoint, data ).subscribe( 
      response => { 
      this.image = "data:image/jpeg;base64,"+response.processed_image;

    }, 
      (err: HttpErrorResponse) => {
        alert(err.message);
      },    
    );
  }
   //converts image to base64 string
  _handleReaderLoaded(readerEvt) {
    let binaryString = readerEvt.target.result;
    this.base64TextString= btoa(binaryString); 
    this.image = "data:image/jpeg;base64,"+this.base64TextString;
  }

}
