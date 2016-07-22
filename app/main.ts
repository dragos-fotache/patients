import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './component/app.component';

import { HTTP_PROVIDERS } from '@angular/http';
import {enableProdMode} from '@angular/core';

enableProdMode();
bootstrap(AppComponent, 
         [
            HTTP_PROVIDERS
         ]);
