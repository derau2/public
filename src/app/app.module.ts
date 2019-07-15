import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TokenizedPathComponent } from './tokenized-path/tokenized-path.component';

@NgModule({
  declarations: [
    AppComponent,
    TokenizedPathComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
