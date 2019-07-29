import {
    Injectable
} from '@angular/core';

import { LoggerService } from '@core';

import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FocusManagerModel } from '../focus-manager/index';

@Injectable()
export class NotificationService {

    productAddedToCartNotification: Subject<null> = new Subject<null>();
    productAddedToCartFromDialogNotification: Subject<null> = new Subject<null>();
    disableUINotification: Subject<null> = new Subject<null>();
    contentLoadedNotification: Subject<FocusManagerModel> = new Subject<FocusManagerModel>();
    resetStepper: Subject<any> = new Subject<any>();

    resetProvision: boolean = false;
    private subject = new BehaviorSubject<any>({ resetProvision: false });
    public setvalue = this.subject.asObservable();

    reset(val: boolean) {
        this.resetProvision = val;
        this.subject.next({ resetProvision: val });
    }


    constructor(
        private _logger: LoggerService
    ) {
        this._logger.info('NotificationService : constructor');
    }

    notifyProductAddedToCart() {
        this._logger.info('NotificationService : notifyNonCatalogProductAddedToCart');
        this.productAddedToCartNotification.next();
    }

    notifyProductAddedToCartFromDialog() {
        this._logger.info('NotificationService : notifyNonCatalogProductAddedToCart');
        this.productAddedToCartFromDialogNotification.next();
    }

    notifyEventContentLoaded(focusManagerModel?: FocusManagerModel) {
        this._logger.info('NotificationService : notifyEventContentLoaded');
        this.contentLoadedNotification.next(focusManagerModel);
    }

    notifyDisableUI() {
        this._logger.info('NotificationService : notifyDisableUI');
        this.disableUINotification.next();
    }



}
