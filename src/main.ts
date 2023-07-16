import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  window.addEventListener('beforeunload', function(event) {
    // Benachrichtigung anzeigen
    event.preventDefault();
    event.returnValue = 'Leave';
  });