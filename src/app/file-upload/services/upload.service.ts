import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { FileUploadService } from './file-upload.service';
import { FileUpload } from '../models/file-upload.model';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  fileLink: string = '';

  constructor(private uploadService: FileUploadService) { }

  selectFile(event: any): void {
    this.selectedFiles = undefined;
    this.selectedFiles = event.target.files;
    if (this.selectedFiles.length > 0){
      console.log('Selected File: ', this.selectedFiles);
      this.upload();
    } else {
      console.log('No Selected File: ', this.selectedFiles);
      this.uploadService.profileImgUpload = false;
    }
   
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
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }

  // showUrl(){
  //   let urlA: any = document.getElementById('url')?.innerHTML;
  //   if (urlA?.length < 5) {
  //     setTimeout(this.showUrl, 1000);
  //   }else{
  //     console.log('link', urlA);
      
  //   }
    
  // }


}

