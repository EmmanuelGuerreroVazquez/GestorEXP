import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdService } from 'src/app/services/prod.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-prodep',
  templateUrl: './prodep.page.html',
  styleUrls: ['./prodep.page.scss'],
})
export class ProdepPage implements OnInit {

  results: Observable<any>;
  codigo = '';
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  searchChanged(){
    //this.results = this.authService.getProd();
  }
  test(){
    //this.authService.getProd();
  }

}
