import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageloaderComponent } from '../../../infra-lib/src/lib/+component/pageloader/pageloader.component';
import { PageloaderService } from '../../../infra-lib/src/lib/+services/+general/pageloader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PageloaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  loader = inject(PageloaderService);
  title = 'Bookie';
}
