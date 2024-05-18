import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    if (this.authService.login(email, password)) {
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Correo electrónico o contraseña incorrectos';
    }
  }

  onForgotpassword(): void {
    this.router.navigate(['forgot-password'], { relativeTo: this.route.parent });
  }

  onSignup(): void {
    this.router.navigate(['sign-up'], { relativeTo: this.route.parent });
  }
}
