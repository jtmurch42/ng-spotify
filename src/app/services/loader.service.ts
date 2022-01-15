import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loading: boolean;

  get isLoading(): boolean {
    return this.loading;
  }

  constructor() {
    this.loading = false;
  }

  show() {
    this.loading = true;
  }

  hide() {
    this.loading = false;
  }
}
