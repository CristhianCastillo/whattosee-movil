import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { GlobalProviderService } from '../services/global-provider.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-modal-movie',
  templateUrl: './modal-movie.page.html',
  styleUrls: ['./modal-movie.page.scss'],
})
export class ModalMoviePage implements OnInit {

  public movieInfo: any;
  constructor(private globalService: GlobalProviderService,
    private modalController: ModalController,
    private navParams: NavParams, public alertCtrl: AlertController,
    private movieService: MovieService) { }

  ngOnInit() {
    this.movieInfo = this.navParams.get('movie');
  }

  closeModal() {
    this.modalController.dismiss();
  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  sendComment() {
    this.alertCtrl.create({
      header: 'Enviar Comentario',
      message: "Ingrese un comentario",
      inputs: [
        {
          name: 'Comentario',
          placeholder: 'Tu comentario'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Enviar',
          handler: data => {
            if (data != null && data != '') {
              const comment = {
                description: data.Comentario,
                userEntity: {
                  id: this.globalService.idUser
                },
                movieEntity: {
                  id: this.movieInfo.id
                }
              };
              this.movieService.createComment(comment).subscribe(
                (result: any) => {
                  console.log(result);
                  if (result.status === '00') {
                    this.showAlertMessage('Comnetario realizado correctamente.');
                  } else {
                    this.showErrorAlert('No se ha podido enviar el comentario.');
                  }
                },
                (err) => {
                  console.error(err.message);
                  this.showErrorAlert(err.message);
                });
            }
          }
        }
      ]
    }).then(alert => {
      alert.present();
    });
  }

  showAlertMessage(message: string) {
    this.alertCtrl.create({
      header: 'Message',
      message: message,
      buttons: ['Aceptar']
    }).then(alert => {
      alert.present();
    });
  }

  showErrorAlert(message: string) {
    this.alertCtrl.create({
      header: 'Error',
      message: message,
      buttons: ['Aceptar']
    }).then(alert => {
      alert.present();
    });
  }

  getScoreMovie(score: number, scoreCounter: number) {
    if (scoreCounter === 0)
      return 0;
    return score / scoreCounter;
  }

  scoreMovie() {
    this.alertCtrl.create({
      header: 'Radio',
      message: "Ingrese un comentario",
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: '1 Estrella',
          value: 1,
          checked: false
        },
        {
          name: 'radio2',
          type: 'radio',
          label: '2 Estrellas',
          value: 2,
          checked: false
        },
        {
          name: 'radio3',
          type: 'radio',
          label: '3 Estrellas',
          value: 3,
          checked: false
        },
        {
          name: 'radio4',
          type: 'radio',
          label: '4 Estrellas',
          value: 4,
          checked: false
        },
        {
          name: 'radio5',
          type: 'radio',
          label: '5 Estrellas',
          value: 5,
          checked: false
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Enviar',
          handler: data => {
            console.log(data);
            const score = {
              score: data,
              idMovie: this.movieInfo.id
            };
            this.movieService.scoreMovie(score).subscribe(
              (result: any) => {
                console.log(result);
                if (result.status === '00') {
                  this.showAlertMessage('Calificación realizada correctamente.');
                } else {
                  this.showErrorAlert('No se ha podido enviar la calificación.');
                }
              },
              (err) => {
                console.error(err.message);
                this.showErrorAlert(err.message);
              });
          }
        }
      ]
    }).then(alert => {
      alert.present();
    });
  }

}
