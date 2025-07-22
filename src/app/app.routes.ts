import { Routes } from '@angular/router';
import { pendingChangesGuard } from './core/guards/pending-changes.guard';

export const routes: Routes = [
  {
    path: 'summary',
    loadComponent: () =>
      import('./ui/pages/summary/summary.component').then(
        (m) => m.SummaryComponent
      ),
    children: [
      {
        path: 'edit/:id',
        loadComponent: () =>
          import(
            './ui/pages/summary/components/edit-form-modal/edit-form-modal.component'
          ).then((m) => m.EditFormModalComponent),
        canDeactivate: [pendingChangesGuard],
      },
      {
        path: 'new',
        loadComponent: () =>
          import(
            './ui/pages/summary/components/edit-form-modal/edit-form-modal.component'
          ).then((m) => m.EditFormModalComponent),
        canDeactivate: [pendingChangesGuard],
      },
    ],
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./ui/pages//edit-form/edit-form.component').then(
        (m) => m.EditFormComponent
      ),
    canDeactivate: [pendingChangesGuard],
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./ui/pages//edit-form/edit-form.component').then(
        (m) => m.EditFormComponent
      ),
    canDeactivate: [pendingChangesGuard],
  },
  {
    path: '**',
    redirectTo: '/summary',
    pathMatch: 'full',
  },
];
