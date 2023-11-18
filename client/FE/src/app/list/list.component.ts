import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  list:any=[];
  constructor(private heroService: HeroService) {console.warn("hello"); }
  
  
  ngOnInit(): void {
    this.heroService.getAllTasks().subscribe((data)=> {
      this.list = data;
      this.heroService.list = data;
    });;
  }

}
