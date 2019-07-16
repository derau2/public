import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TokenizedPathComponent } from './tokenized-path/tokenized-path.component';
import {CovalentCodeEditorModule} from '@covalent/code-editor';
import { NgbModule, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    TokenizedPathComponent,
  ],
  imports: [
    BrowserModule,
    CovalentCodeEditorModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
