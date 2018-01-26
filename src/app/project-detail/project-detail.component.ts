import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { FirebaseObjectObservable } from 'angularfire2/database';

import { Project } from '../project.model';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  providers: [ProjectsService]
})

export class ProjectDetailComponent implements OnInit {
  project: Project;
  projectId: string;
  selectedProjectKey: string = null;
  projectContributions: any[] = [];
  currentRoute: string = this.currRoute.url;

  constructor(
    private currRoute: Router,
    private projectsService: ProjectsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.projectId = urlParameters['id'];
    });

    this.projectsService.getProjectById(this.projectId).subscribe(projectLastEmitted => {
      this.project = projectLastEmitted;
    });

    this.projectsService.getContributionsById(this.projectId).subscribe(contributionsLastEmitted => {
      this.projectContributions = contributionsLastEmitted;
    });
  }

  fundButtonClicked() {
    this.selectedProjectKey = this.projectId;
  }

  fundingComplete() {
    this.selectedProjectKey = null;
  }

  contributionToDelete(projectId, contributionKey) {
    this.projectsService.deleteContribution(projectId, contributionKey);
  }
}
