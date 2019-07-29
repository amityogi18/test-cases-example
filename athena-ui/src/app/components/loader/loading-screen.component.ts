import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService} from '../service/loader.service'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent implements OnInit,OnDestroy {
  public loading: boolean = false;
  loadingSubscription: Subscription;
  constructor(private loaderService: LoaderService) {
    
   }

  ngOnInit() {
    this.loadingSubscription = this.loaderService.loadingStatus.subscribe((value) => {
      this.loading = value;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}
