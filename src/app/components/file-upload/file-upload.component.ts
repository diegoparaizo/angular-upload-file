import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})

export class FilesUploadComponent implements OnInit {
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  hideProgressBar = true;

  fileInfos?: Observable<any>;
  searchText: string = "";
  nameFile: string = "";

  constructor(private uploadService: FileUploadService, private http: HttpClient) { }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    for (let i = 0; i < event.target.files.length; i++) {
      this.nameFile = this.nameFile.concat(event.target.files[i].name,';');
    }
  }

  uploadFiles(): void {
    this.message = [];
  
    if (this.selectedFiles) {
      this.hideProgressBar = false;
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
  
    if (file) {
      this.uploadService.upload(file).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'Carregou o arquivo com sucesso: ' + file.name;
            this.message.push(msg);
            this.fileInfos = this.uploadService.getFiles();
          }
        },
        error: (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Não foi possível fazer upload do arquivo: ' + file.name;
          this.message.push(msg);
          this.fileInfos = this.uploadService.getFiles();
        },
        complete: () => {
          setTimeout(() => {this.hideProgressBar = true;}, 1000);          
        }
      });
    }
  }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }
}