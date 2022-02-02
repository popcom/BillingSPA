import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  public progress!: number;
  public message: string = "";
  @Output() public onUploadFinished = new EventEmitter();

  private uploadUrl = environment.baseUrl + 'api/upload';

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  public uploadFile = (files: FileList) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post(this.uploadUrl, formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total!);
        else if (event.type === HttpEventType.Response) {
          console.log(event)
          this.message = 'Upload success!';
          this.onUploadFinished.emit(event.body);
        }
      });
  }
}