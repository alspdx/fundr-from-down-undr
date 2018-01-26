import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ProjectsService } from '../../projects.service';

@Component({
  selector: 'app-project-fund',
  templateUrl: './project-fund.component.html',
  styleUrls: ['./project-fund.component.scss'],
  providers: [ProjectsService]
})

export class ProjectFundComponent implements OnInit {
  @Input() childSelectedProjectKey: string;
  @Output() closeFundFormClick = new EventEmitter();

  formWarning: boolean = false;

  constructor(
    private projectsService: ProjectsService
  ) { }

  ngOnInit() {
  }

  submitForm(name, amount, comment) {
    if (name && amount && comment) {
      this.projectsService.submitContribution(this.childSelectedProjectKey, name, amount, comment);
      this.formWarning = false;
      this.closeFundFormClick.emit();
    } else {
      this.formWarning = true;
    }
  }

  cancelForm() {
    if(confirm("Are you sure you don't want to fund this project?")) {
      alert("Jerk!");
      this.closeFundFormClick.emit();
      this.formWarning = false;
    }
  }
}
