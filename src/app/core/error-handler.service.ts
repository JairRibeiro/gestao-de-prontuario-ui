import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { NotAuthenticatedError } from './../security/app-http';
import { NotificationsComponent } from './notification/notifications.component';
import { AuthService } from 'app/security/auth.service';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private notification: NotificationsComponent,
    private router: Router,
    private auth: AuthService
  ) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if (errorResponse instanceof NotAuthenticatedError) {
      msg = 'Sua sessão expirou!';

      this.auth.removeAccessToken();
      this.router.navigate(['/login']);

    } else if (errorResponse instanceof HttpErrorResponse
      && errorResponse.status >= 400 && errorResponse.status <= 499) {

      msg = 'Ocorreu um erro ao processar a sua solicitação';

      if(errorResponse.status === 404 && errorResponse.error && errorResponse.error.message) {
        msg = errorResponse.error.message;
      }

      if (errorResponse.status === 401) {
        msg = 'Você não tem permissão para executar esta ação';
      }

      if (errorResponse.status === 405 && errorResponse.error && errorResponse.error.message) {
        msg = errorResponse.error.message;
      }

      if (errorResponse.status === 403) {
        msg = 'Sua sessão expirou!';
        this.auth.removeAccessToken();
        this.router.navigate(['/login']);
      }

      try {
        msg = errorResponse.error[0].mensagemUsuario;
      } catch (e) { }

      console.error('Ocorreu um erro', errorResponse);

    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro', errorResponse);
    }

    this.notification.showError(msg);
  }

}