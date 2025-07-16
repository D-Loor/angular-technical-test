import { ErrorHandler, inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../../app/ui-kit/services/utils/toast.service';
import { LoaderService } from '../../ui-kit/services/utils/loader.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    private _toastService = inject(ToastService);
    private _loaderService = inject(LoaderService);

    handleError(error: any): void {
        this._loaderService.show(false);
        console.error('Global Error Handler:');

        if (error instanceof HttpErrorResponse) {
            console.error('Backend returned status code:', error.status);
            console.error('Response body:', error.error);

            switch (error.status) {
                case 400:
                    this._toastService.emitToast("Error", "Se ha presntado un error en la solicitud!", "error", true);
                    break;
                case 404:
                    this._toastService.emitToast("Error", "No se ha encontrado el recurso!", "error", true);
                    break;
                case 500:
                    this._toastService.emitToast("Error", "Se ha producido un error en el servidor!", "error", true);
                    break;
                default:
                    this._toastService.emitToast("Error", "Ha ocurrido un error inesperado!", "error", true);
                    break;
            }

        } else {
            console.error('An unexpected error occurred:', error.message);
            this._toastService.emitToast("Error", "Ha ocurrido un error inesperado!", "error", true);
        }

    }
}