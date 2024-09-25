import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading = new BehaviorSubject<boolean>(false);
  loadingState$ = this.loading.asObservable();

  setLoadingState(state: boolean): void {
    this.loading.next(state);
  }
}
