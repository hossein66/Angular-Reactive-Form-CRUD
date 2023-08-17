import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrawlerService } from '../../services/crawler.service';

@Component({
  selector: 'app-search-url',
  templateUrl: './search-url.component.html',
  styleUrls: ['./search-url.component.css']
})
export class SearchUrlComponent implements OnInit {
  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private crawlerService :CrawlerService) { }

  ngOnInit(): void {
    this.reactiveForm();
  }
  reactiveForm() {
    this.searchForm = this.formBuilder.group({
      URL: ['', [Validators.required]],
      Deep: ['',[Validators.required]],
    });
  }
  public errorHandling = (control: string, error: string) => {
    return this.searchForm.controls[control].hasError(error);
  }

  onSubmit() {
    if (this.searchForm.invalid) {
        return;
    }
    console.log(this.searchForm.value);
   this.crawlerService.search(this.searchForm.controls['URL'].value,this.searchForm.controls['Deep'].value);

  //  let result= this.customerService.addcustomer(this.searchForm.value);
  //  this.messageService.openSnackBar(result.message);
  //  if (result.isSuccess) {
  //   this.router.navigate(['customers']);
  //  }
}
}
