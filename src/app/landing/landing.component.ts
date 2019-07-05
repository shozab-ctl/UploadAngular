import { Component, OnInit } from '@angular/core';
import { FileUploadServiceService } from '../file-upload-service.service';
import { Router } from '@angular/router';
import { DataModel } from '../file-modal';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  fileToUpload: File = null;
  dataModel: DataModel = null;
  constructor(
    private fileUploadService: FileUploadServiceService,
    public router: Router,
  ) { }

  ngOnInit() {
  }

  handleFileInput(file: File) {
    this.fileToUpload = file;
    this.uploadFileActivity();
  }

  uploadFileActivity() {
    this.fileUploadService.postFile(this.fileToUpload).subscribe(res => {
      if (res.statusCode === 200) {
        this.fileUploadService.setImportData(res.data);
        this.router.navigate(['importWizard']);
      }
    }, error => {
      console.log(error);
    });
  }
}
