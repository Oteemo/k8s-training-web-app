import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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
   image: any;
   imageName: string;
   baseAddress: string;
   restApi: string;
   base64TextString: any;
   endpoint: string;
   location: string;
   headers: HttpHeaders;
   constructor(private http:HttpClient) {

  }
  ngOnInit() {
    this.location = environment.location;
    this.baseAddress =  environment.apiUrl;
    this.restApi = '/v0.1/pedestrian_detector';
    this.endpoint = this.baseAddress + this.restApi;
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
      alert('Success!');
      this.image = "data:image/jpeg;base64,"+response.processed_image;

    }, 
      (err: HttpErrorResponse) => {
        alert(err.message);
      },    
    );
  }
   //converts image to base64 string
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64TextString= btoa(binaryString); 
    this.image = "data:image/jpeg;base64,"+this.base64TextString;
  }

}
