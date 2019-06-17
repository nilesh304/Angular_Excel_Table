import { Component, OnInit } from '@angular/core';
import { AdventureTimeService } from "../adventure-time.service";
import { Observable } from 'rxjs';
import { saveAs } from "file-saver";
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers:[AdventureTimeService]
})
export class TestComponent implements OnInit {

  constructor(private service:AdventureTimeService) { }
  filename='';
  characters: Observable<any[]>;
  columns:string[];
  ngOnInit() {
    
  }
  print(){
    console.log("hello");
    console.log(this.service.getColumn());
    this.columns=this.service.getColumn();
    this.characters = this.service.getCharacters();
    console.log(this.characters);
    
  }
  fileName(event :any)
  {
      this.filename=event.target.value;
      
  }
    exportData () {
        var wb = XLSX.utils.table_to_book(document.getElementById("exportable"));
        var wbout=XLSX.write(wb,{bookType:'xlsx', bookSST:true,type:"binary"})
        function s2ab(s) {
          var buf = new ArrayBuffer(s.length);
          var view = new Uint8Array(buf);
          for (var i=0; i<s.length; i++)
            view[i] = s.charCodeAt(i) & 0xFF;
          return buf;
        }
        
        console.log(this.filename);
        saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), this.filename+".xlsx");
        this.filename="";

        
    };

  }

