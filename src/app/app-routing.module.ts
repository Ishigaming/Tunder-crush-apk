import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
    {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'update',
    loadChildren: () => import('./pages/update/update.module').then( m => m.UpdatePageModule)
  },
  {
    path: 'gender-selection',
    loadChildren: () => import('./pages/gender-selection/gender-selection.module').then( m => m.GenderSelectionPageModule)
  },
  {
    path: 'birthdate',
    loadChildren: () => import('./pages/birthdate/birthdate.module').then( m => m.BirthdatePageModule)
  },
  {
    path: 'passions',
    loadChildren: () => import('./pages/passions/passions.module').then( m => m.PassionsPageModule)
  },
  {
    path: 'imgprofile',
    loadChildren: () => import('./pages/imgprofile/imgprofile.module').then( m => m.ImgprofilePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'chats',
    loadChildren: () => import('./pages/chats/chats.module').then( m => m.ChatsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
