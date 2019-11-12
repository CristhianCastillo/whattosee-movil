import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, AlertController } from '@ionic/angular';
import { GlobalProviderService } from '../services/global-provider.service';
import { DiscussionService } from '../services/discussion.service';

@Component({
  selector: 'app-modal-discussion',
  templateUrl: './modal-discussion.page.html',
  styleUrls: ['./modal-discussion.page.scss'],
})
export class ModalDiscussionPage implements OnInit {

  public discussion: any;
  constructor(private navParams: NavParams, private modalController: ModalController,
    public alertCtrl: AlertController, private globalService: GlobalProviderService,
    private discussionService: DiscussionService) { }

  ngOnInit() {
    this.discussion = this.navParams.get('discussion');
    console.log("Discussion: ", this.discussion);
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
                discussionEntity: {
                  id: this.discussion.id
                }
              };
              this.discussionService.createComment(comment).subscribe(
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

}
