import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, LoadingController, AlertController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { ModalMoviePage } from '../modal-movie/modal-movie.page';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  public idGender: number;
  public movies: any;

  constructor(private route: ActivatedRoute, private router: Router,
    private modalController: ModalController, private moviesService: MovieService,
    public loadingCtrl: LoadingController, public alertController: AlertController) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.idGender = this.router.getCurrentNavigation().extras.state.idGenderMovies;
        console.log("Id categoria: ", this.idGender);
        this.loadingCtrl.create({
          message: "Cargando datos..."
        }).then(a => {
          a.present();
          this.moviesService.getMovisByGender(this.idGender).subscribe((result: any) => {
            a.dismiss();
            if (result.status === "00") {
              console.log(result.result);
              this.movies = result.result;
            } else {
              this.showErrorAlert(result.result);
            }
          },
            (err) => {
              a.dismiss();
              console.error(err.message);
              this.showErrorAlert(err.message);
            });
        });
      }
    });
  }

  async goToInfoMovie(movie: any) {
    await this.openModal(movie);
  }

  async openModal(movie: any) {
    const modal: HTMLIonModalElement =
      await this.modalController.create({
        component: ModalMoviePage,
        componentProps: {
          aParameter: true,
          otherParameter: new Date(),
          movie: movie
        }
      });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        console.log('The result:', detail.data);
      }
    });

    await modal.present();
  }

  ngOnInit() {
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
