import { Injectable } from '@angular/core';

@Injectable()
export class PersistanceService {
  set(key: string, data: any) {
    try {
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Saving to localstorage failed', error);
    }
  }

  get(key: string): any {
    try {
      return JSON.parse(window.localStorage.getItem(key));
    } catch (error) {
      console.error('Getting from localstorage failed', error);
      return null;
    }
  }
}
