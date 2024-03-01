import { Component, OnInit } from '@angular/core';
import { ICompanies } from '../../model/ICompanies';
import { CompaniesSvcService } from '../../service/companies-svc.service';
import { error } from 'console';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})
export class CompaniesComponent implements OnInit {

  list!: ICompanies[];

  constructor(
    private companisSvc: CompaniesSvcService
  ) { }
  ngOnInit(): void {
    this.companisSvc.getAllCompanies().subscribe(
      res => {
        this.list = this.getCompanies(res)
      },
      error => {
        console.log(error);
      }
    );
  }

  getCompanies(res: any): ICompanies[] {
    return res.response.content
  }


}
