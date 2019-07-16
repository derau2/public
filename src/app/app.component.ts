import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'monaco-custom';
  pathCodeEditorControl: FormControl;
  fileNameFormat: string;

  ngOnInit() {
    this.pathCodeEditorControl = new FormControl(      
      "",
      [
        Validators.required,
      ]          
    );
  }

  onEditPartionedFileName($event) {
    
  }

}
