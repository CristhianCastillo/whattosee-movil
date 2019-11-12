import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public movies: any;
  constructor(public alertController: AlertController,
    private router: Router, private movieService: MovieService, public loadingCtrl: LoadingController) { }


  goToMovies(id: number) {
    let navigationExtras: NavigationExtras = {
      state: {
        idGenderMovies: id
      }
    };
    this.router.navigateByUrl('/movies', navigationExtras);
  }

  ngOnInit() {
    this.loadingCtrl.create({
      message: "Cargando categorias..."
    }).then(a => {
      a.present();
      this.movieService.getMoviGenders().subscribe((result: any) => {
        a.dismiss();
        if (result.status === "00") {
          this.movies = result.result;
        } else {
          this.showErrorAlert(result.result);
        }
      },
        (err) => {
          a.dismiss();
          console.log(err.message);
          this.showErrorAlert(err.message);
        });
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

}
