import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrawleredListComponent } from './components/crawlered-list/crawlered-list.component';
import { SearchUrlComponent } from './components/search-url/search-url.component';

const routes: Routes = [
  {
    path: '',
    component: CrawleredListComponent
  },
  {
    path: 'search',
    component: SearchUrlComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrwalerWebRoutingModule { }
