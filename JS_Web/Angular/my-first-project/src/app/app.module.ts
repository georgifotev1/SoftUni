import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';

const myProvider: Provider = {
  useValue:123,
  provide: "test"
}

@NgModule({
  declarations: [
    AppComponent,
    ListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [myProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
