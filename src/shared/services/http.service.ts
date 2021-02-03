import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpOptions } from '../entities/http-options';
import { ToastController } from '@ionic/angular';
import { Observable, throwError, timer, of } from 'rxjs';
import { timeout, catchError, retryWhen, tap, mergeMap, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private urlServer;
  private _notification = false;

  constructor(
    private toastCtrl: ToastController,
    private http_client: HttpClient
  ) {
  }

  makeCall(options: HttpOptions, timeout401: number = 0) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        let headers = new HttpHeaders();
        const optionsHeaders = options.getHeaders();
        let isContentType = false;
        optionsHeaders.forEach(header => {
          if (header.key.toLowerCase() == 'content-type') {
            isContentType = true;
          }
        });
        if (!isContentType) {
          optionsHeaders.push({ key: 'Content-Type', value: 'application/json' });
        }
        // Add Auth header
        // if (options.auth) {
        //   let tokenInfo = await this.persistence.getData(this._token);
        //   let token = tokenInfo !== null ? tokenInfo['access_token'] : null;
        //   if (token != null) { optionsHeaders.push({ key: 'Authorization', value: 'Bearer ' + token }); }
        // }
        // create call options
        let req: Observable<any>;
        optionsHeaders.forEach((item => {
          headers = (headers as HttpHeaders).append(item.key, item.value);
        }));

        if (options.method == 'GET') {
          req = this.http_client.get(options.url);
          if (optionsHeaders.length > 0 || options.auth) {
            req = this.http_client.get(options.url, { headers: (headers as HttpHeaders) });
          }
        } else if (options.method === 'DELETE') {
          req = this.http_client.delete(options.url);
          if (optionsHeaders.length > 0 || options.auth) {
            req = this.http_client.delete(options.url, { headers: (headers as HttpHeaders) });
          }
        } else if (options.method == 'POST') {
          let body = {};
          if (options.bodyData != undefined) {
            body = options.bodyData;
          }
          req = this.http_client.post(options.url, body, { headers: (headers as HttpHeaders) });
        } else if (options.method == 'PUT') {
          let body = {};
          if (options.bodyData != undefined) {
            body = options.bodyData;
          }
          req = this.http_client.put(options.url, body, { headers: (headers as HttpHeaders) });
        }

        req.pipe(
          timeout(30000),
          retryWhen((errors) =>
            errors.pipe(this.genericRetryStrategy())
          ),
          catchError(error => of(error))).subscribe(async res => {
            if (res && res.status != null && res.status != undefined && res.status != 200) {
              await this._handleError(res);
              reject(res);
            } else {
              return resolve(res);
            }
          }, async err => {
            await this._handleError(err);
            reject(err);
          });
      } catch (e) {
        return reject(e);
      }

    });
  }

  private async _handleError(err: any) {
    const option = {
      message: '',
      type: '',
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'OK',
      retry: false
    };
    let retry = false;

    if (!this._notification) {
      this._notification = true;
      switch (err.name) {
        case 'HttpErrorResponse':
          switch (err.status) {
            case 0:
              if (err.message.match(/unknown url/)) {
                option.message = 'Lo sentimos, al parecer no tienes conexión a internet';
                option.type = 'ConnectionError';
                option.retry = true;
                retry = true;
              } else {
                option.message = 'Request error unknown';
              }
              break;
            case 400:
              option.message = 'Mal request!';
              break;
            case 401:
              option.message = 'No tienes acceso a esta informacion';
              break;
            case 403:
              option.message = 'Oops!...';
              break;
            case 404:
              option.message = 'No se encontro el recurso!';
              break;
            case 500:
              option.retry = true;
              retry = true;
              option.message = 'Ocurrio un error interno en el servidor!';
              break;
            case 503:
              option.retry = true;
              retry = true;
              option.message = 'Ocurrio un error interno en el servidor!';
              break;
            default:
              option.message = 'Request error status ' + err.status;
              break;
          }
          break;
        case 'TimeoutError':
          option.message = 'En este momento tenemos problemas para cargar la aplicación.<br>Vuelve a visitarnos en unos instantes';
          option.type = 'TimeoutError';
          option.retry = true;
          retry = true;
          break;
      }

      if (retry) {
        option.retry = retry;
      }

      if (!retry) {
        const toast = await this.toastCtrl.create({
          message: option.message,
          position: 'bottom',
          duration: 10000,
          color: 'danger',
        });
        // toast.present();
        console.error(option);
      }

      this._notification = !this._notification;
    }
    return true;
  }
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('fired'));
  }

  private genericRetryStrategy = ({
    maxRetryAttempts = 0,
    scalingDuration = 1000,
    excludedStatusCodes = []
  }: {
    maxRetryAttempts?: number,
    scalingDuration?: number,
    excludedStatusCodes?: number[]
  } = {}) => (attempts: Observable<any>) => {
    return attempts.pipe(
      mergeMap((error, i) => {
        const retryAttempt = i + 1;
        if (
          retryAttempt > maxRetryAttempts ||
          excludedStatusCodes.find(e => e === error.status)
        ) {
          return throwError(error);
        }
        console.log(
          `Attempt ${retryAttempt}: retrying in ${retryAttempt *
          scalingDuration}ms`
        );
        // retry after 1s, 2s, etc...
        return timer(retryAttempt * scalingDuration);
      }),
      finalize(() => console.log('We are done!'))
    );
  }
}
