import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'traveaux',
        children: [
          {
            path: '',
            loadChildren: '../traveaux/tab1.module#Tab1PageModule'
          }
        ]
      },
      {
        path: 'clients',
        children: [
          {
            path: '',
            loadChildren: '../clients/tab2.module#Tab2PageModule'
          }
        ]
      },
      {
        path: 'techniciens',
        children: [
          {
            path: '',
            loadChildren: '../techniciens/tab3.module#Tab3PageModule'
          }
        ]
      },
      {
        path: 'options',
        children: [
          {
            path: '',
            loadChildren: '../options/tab4.module#Tab4PageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/pages/tabs/traveaux',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/pages/tabs/traveaux',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
