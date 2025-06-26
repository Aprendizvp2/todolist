import { importProvidersFrom } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage-angular'; 

import { 
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules
} from '@angular/router';
import { 
  IonicRouteStrategy,
  provideIonicAngular
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { CategoryService } from './app/services/category.service';
import { TaskService } from './app/services/task.service';
import { bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    CategoryService,
    TaskService,
    importProvidersFrom(IonicStorageModule.forRoot()),
  ]
}).catch(err => console.error(err));
