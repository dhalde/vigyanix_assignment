import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  task: any = [];
  id: any;
  estimate_hours: any;
  estimate_notes: any;
  constructor(private heroService: HeroService, private route: ActivatedRoute, private location: Location) {
    route: ActivatedRoute;
    console.log("loaded detail");
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log(this.route.snapshot.params["id"]);
    this.heroService.getTask(this.id).subscribe((data) => {
      this.task = data;
      console.log(this.task[0]["task_id"]);
    });

  }

  update() {
    console.log(this.task);
    if (this.task[0]["task_id"].notes && this.task[0]["task_id"].actual_hours) {
      this.heroService.updateTask(this.id, { "notes": this.task[0]["task_id"].notes, "actual_hours": this.task[0]["task_id"].actual_hours }).subscribe();;
    }

    if (this.estimate_hours && this.estimate_notes) {
      this.heroService.updateEstimateTask({ "task_id": this.id, "new_estimate_hours": this.estimate_hours, "new_estimated_notes": this.estimate_notes }).subscribe();
    }

    this.heroService.getTask(this.id).subscribe(data => {
      this.task = data;
    });
  }

  goback() {
    this.location.back();
  }


}
