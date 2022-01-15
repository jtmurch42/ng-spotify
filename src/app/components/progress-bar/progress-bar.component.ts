import { Component } from '@angular/core';

import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
  constructor(public loader: LoaderService) {}
}
