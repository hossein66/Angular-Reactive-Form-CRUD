import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: "home" , component: AppComponent},
  {
    path: "customers",
    loadChildren: () =>
      import("./modules/customers/customers.module").then(
        (m) => m.CustomersModule
      ),
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    enableTracing: false,
    preloadingStrategy: PreloadAllModules /*, useHash: true*/,
  }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
