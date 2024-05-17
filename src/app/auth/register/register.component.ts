import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private router: Router, private route: ActivatedRoute) { }

  // On Signup link click
  onSignIn() {
    this.router.navigate(['login'], { relativeTo: this.route.parent });
  }

  ngOnInit(): void {
  }



}
