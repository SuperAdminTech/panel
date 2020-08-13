import { PathResolveService } from './services/path-resolve.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      ...routes,
      {
        path: '**',
        resolve: {
          path: PathResolveService,
        },
        component: NotFoundComponent,
      },
    ]),
  ],
  exports: [RouterModule],
  providers: [PathResolveService],
})
export class AppRoutingModule {}
