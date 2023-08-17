import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrawleredListComponent } from './components/crawlered-list/crawlered-list.component';
import { CrwalerWebRoutingModule } from './crwaler-web-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SearchUrlComponent } from './components/search-url/search-url.component';



@NgModule({
  declarations: [
    CrawleredListComponent,
    SearchUrlComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CrwalerWebRoutingModule
  ]
})
export class CrwalerWebModule { }
