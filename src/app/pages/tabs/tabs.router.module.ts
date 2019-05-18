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
        path: 'personnels',
        children: [
          {
            path: '',
            loadChildren: '../personnels/tab2.module#Tab2PageModule'
          }
        ]
      },
      {
        path: 'messages',
        children: [
          {
            path: '',
            loadChildren: '../messages/tab3.module#Tab3PageModule'
          }
        ]
      },
      {
        path: 'plus',
        children: [
          {
            path: '',
            loadChildren: '../plus/tab4.module#Tab4PageModule'
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
