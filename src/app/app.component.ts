import { Component } from '@angular/core';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Excel';
  arrayBuffer:any;
file:File;
keys:string[];
data:any[]=[];


incomingfile(event) 
  {
  this.file= event.target.files[0]; 
  this.Upload();
  }

 Upload() {
   this.keys=[];
   this.data=[];
      let fileReader = new FileReader();
        fileReader.onload = (e) => {
            this.arrayBuffer = fileReader.result;
            var data = new Uint8Array(this.arrayBuffer);
            var arr = new Array();
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            var workbook = XLSX.read(bstr, {type:"binary"});
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
            var wos=(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
            this.keys=Object.keys(XLSX.utils.sheet_to_json(worksheet,{raw:true})[0])
            console.log(this.keys);
            // this.keys.forEach(element => {
              
            // });
            console.log(wos);
            wos.forEach(element => {

              console.log(element);
              this.data.push(element);
            });

        }
        fileReader.readAsArrayBuffer(this.file);
        
}
}
