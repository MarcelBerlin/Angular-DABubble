import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FileUpload } from '../models/file-upload.model';
import { FileUploadService } from '../services/file-upload.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  

  constructor(private uploadService: FileUploadService) { }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    console.log('selectedFiles:', this.selectedFiles);
  }



  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
            console.log(this.percentage);
            if(this.percentage == 100) this.showUrl();
          },
          error => {
            console.log(error);
          }
        );
      }
    }
    
    
  }

  showUrl(){
    let urlA: any = document.getElementById('url')?.innerHTML;
    if (urlA?.length < 5) {
      setTimeout(this.showUrl, 1000);
    }else{
      console.log('link', urlA);
    }
    
  }


}