import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-process-details',
  templateUrl: './process-details.page.html',
  styleUrls: ['./process-details.page.scss'],
})
export class ProcessDetailsPage implements OnInit {

  constructor(
    private authService : AuthService
  ) { }

  ngOnInit() {
  }

  logout()
  {
    this.authService.logout()
  }

}
