import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { PollService } from '../../services/poll.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {

  public formPoll!: UntypedFormGroup;
  public titleAlert: string = 'This field is required';

  public genres: any[] = [
    { value: 'rock', viewValue: 'Rock' },
    { value: 'pop', viewValue: 'Pop' },
    { value: 'clasica', viewValue: 'Clásica' },
  ];

  constructor(private formBuilder: UntypedFormBuilder, public pollService: PollService, private toast: NgToastService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formPoll = this.formBuilder.group({
      'email': [null, [Validators.email, Validators.pattern(emailregex)]],
      'genre': [this.genres[0].value, Validators.required]
    });
  }

  onSubmit() {
    let body = {
      'email': this.formPoll.value['email'],
      'genre': this.formPoll.value['genre']
    };

    console.log(body);

    if (body) {
      if (body.genre === 'default' || body.genre === '') {
        this.toast.error({ detail: 'Error', summary: 'Se debe seleccionar un valor para estilo de música', duration: 3000 });
      } else {
        this.pollService.addPoll(body).subscribe(
          {
            complete: () => {
              console.log('Success POST');
            },
            error: (error) => {
              console.log(JSON.stringify(error));
              let message = error.error.text || 'Error desconocido';

              this.toast.error({ detail: 'Error', summary: message, duration: 3000 });
            },
            next: (resp) => {
              if (resp.statusMessage === 'Already exists') {
                this.toast.warning({
                  detail: 'Registro ya ingresado',
                  summary: 'El email en uso, ya ha sido registrado previamente',
                  duration: 5000
                });

              } else {
                this.toast.success({
                  detail: 'Solicitud exitosa',
                  summary: 'Se ha agregado el registro correctamene',
                  duration: 5000
                });
              }
            },
          }
        );
      }
    } else {
      this.toast.error({ detail: 'Error', summary: 'Error en formulario', duration: 3000 });
    }
  }
}
