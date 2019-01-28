import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment as envConfigFile } from '../../../environments/environment';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

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
   title = 'Kubernetes Training';
   private image: any;
   private imageName: string;
   private baseAddress: string;
   private restApi: string;
   private port: string;
   private base64TextString: any;
   private endpoint: string;

   constructor(private http:HttpClient, private spinnerService: Ng4LoadingSpinnerService ) {

  }
  ngOnInit() {
    this.baseAddress =  envConfigFile.settings.baseAddress;
    this.restApi = envConfigFile.settings.apiUrl;
    this.port = envConfigFile.settings.port;
    this.endpoint = this.baseAddress + ':' + this.port + this.restApi;
    this.image = '';
  }

  //reads image, makes call to convert it to base 64 string
  onImageChanged(event) {
    let localImage =  event.target.files[0];
    let localImageName = localImage.name;
    var reader = new FileReader();
    reader.onload = this.imageConversion.bind(this);
    reader.readAsBinaryString(localImage);
    this.image = localImage;
    this.imageName = localImageName;
  }

   //performs post request to endpoint
   uploadImage() {
     let localImage = this.image;
     if(localImage == '') {
      alert("Please upload an image and try again.");
     } else {
    this.spinnerService.show();
    let data = {
      'encoded_image': this.base64TextString,
      'image_name':this.imageName
    }
    this.http.post<DataResponse>(this.endpoint, data ).subscribe( 
      response => { 
      alert("Success!");
      this.image = "data:image/jpeg;base64,"+response.processed_image;
      this.spinnerService.hide();
    }, 
      (err: HttpErrorResponse) => {      
        alert("There was a problem. Please try again later.");
        this.spinnerService.hide();
      },    
    );
    }
  }
   //converts image to base64 string
  imageConversion(readerEvt) {
    let binaryString = readerEvt.target.result;
    this.base64TextString= btoa(binaryString); 
    this.image = "data:image/jpeg;base64,"+this.base64TextString;
  }

   openSidebar() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
  }
   
   closeSidebar() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
  }
}
