import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HeroService } from '../hero.service';
import { window } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  constructor(private router: Router, private heroService: HeroService) {}
  
  herolist:any=[];

  news:any;

  getData(str:any)
  {
    this.heroService.addTask(str).subscribe((data)=> {
      this.router.navigate(['/heroes']);
    });
  }

  ngOnInit(): void {
    
    
  }
}
