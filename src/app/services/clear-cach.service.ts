import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClearCachService {

  clearCache() {
    sessionStorage.clear();
    localStorage.clear();
  }
}
