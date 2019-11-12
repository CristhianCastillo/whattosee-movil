import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public registerForm: FormGroup;
  constructor(private router: Router, private registerService: RegisterService, private formBuilder: FormBuilder,
    public alertController: AlertController, public loadingCtrl: LoadingController) {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required]],
        username: ['', [Validators.required]],
        password: ['', Validators.required],
        confirm: ['', Validators.required]
      }
    );
  }

  ngOnInit() {
  }

  registerUser() {
    this.loadingCtrl.create({
      message: "Verificando..."
    }).then(a => {
      a.present();
      if (this.registerForm.valid) {
        let password = this.registerForm.value['password'];
        let confirm = this.registerForm.value['confirm'];
        if (password === confirm) {
          let user = {
            email: this.registerForm.value['email'],
            userName: this.registerForm.value['username'],
            password: this.registerForm.value['password']
          }
          this.registerService.registerUser(user).subscribe((result: any) => {
            a.dismiss();
            if (result.status === "00") {
              this.showAlertMessage("Usuario registrado correctamente, inicie sesión");
              this.router.navigateByUrl('/login');
            } else {
              this.showErrorAlert(result.result);
            }
          },
            (err) => {
              a.dismiss();
              console.error(err.message);
              this.showErrorAlert(err.message);
            });
        } else {
          a.dismiss();
          this.showErrorAlert("La confirmación no es la misma");
        }
      } else {
        a.dismiss();
        this.showErrorAlert('Faltan campos obligatorios');
      }
    });
  }

  showAlertMessage(message: string) {
    this.alertController.create({
      header: 'Message',
      message: message,
      buttons: ['Aceptar']
    }).then(alert => {
      alert.present();
    });
  }

  showErrorAlert(message: string) {
    this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['Aceptar']
    }).then(alert => {
      alert.present();
    });
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

}
