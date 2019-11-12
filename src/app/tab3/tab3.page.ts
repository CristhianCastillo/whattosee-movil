import { Component } from '@angular/core';
import { DiscussionService } from '../services/discussion.service';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { GlobalProviderService } from '../services/global-provider.service';
import { ModalDiscussionPage } from '../modal-discussion/modal-discussion.page';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public foros: any;
  constructor(private discussionService: DiscussionService,
    public loadingCtrl: LoadingController, public alertController: AlertController,
    private globalService: GlobalProviderService, private modalController: ModalController) {
    this.loadingCtrl.create({
      message: "Cargando foros..."
    }).then(a => {
      a.present();
      this.discussionService.getDiscussions().subscribe((result: any) => {
        a.dismiss();
        if (result.status === "00") {
          console.log(result.result);
          this.foros = result.result;
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

  createDiscussion() {
    this.alertController.create({
      header: 'Crear Foro',
      message: "Ingrese un nombre",
      inputs: [
        {
          name: 'foro',
          placeholder: 'Nombre foro'
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
              const foro = {
                name: data.foro,
                userEntity: {
                  id: this.globalService.idUser
                },
                movieEntity: {
                  id: 1
                }
              };
              this.discussionService.createComment(foro).subscribe(
                (result: any) => {
                  console.log(result);
                  if (result.status === '00') {
                    this.showAlertMessage('Foro creado correctamente.');
                  } else {
                    this.showErrorAlert('No se ha podido crear el foro.');
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

  async goToInfoForo(discussion: any) {
    await this.openModal(discussion);
  }

  async openModal(discussion: any) {
    const modal: HTMLIonModalElement =
      await this.modalController.create({
        component: ModalDiscussionPage,
        componentProps: {
          aParameter: true,
          otherParameter: new Date(),
          discussion: discussion
        }
      });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        console.log('The result:', detail.data);
      }
    });
    await modal.present();
  }

  goToComments(foro: any) {
    console.log(foro);

  }

}
