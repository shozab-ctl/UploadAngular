import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, pipe } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GenericResponse, DataModel, FileRequest } from './file-modal';


@Injectable({
  providedIn: 'root'
})
export class FileUploadServiceService {
  private importDataSubject = new BehaviorSubject(null);
  constructor(private httpClient: HttpClient) { }


  postFile(fileToUpload: File): Observable<GenericResponse> {
    const endpoint = 'http://localhost:8080/exComp/import';
    const formData: FormData = new FormData();
    formData.append('importFile', fileToUpload);
    return this.httpClient.post<any>(endpoint, formData, {}

    );
  }

  savefile(data): Observable<any> {
    const fileRequest: FormData = new FormData();
    fileRequest.append('fileRequest', data);
    console.log(data);
    const url = 'http://localhost:8080/exComp/importFile';
    return this.httpClient.post<any>(url, data, {});
  }

  setImportData(data: DataModel) {
    this.importDataSubject.next(data);
  }

  getImportData() {
    return this.importDataSubject.asObservable();
  }


}
