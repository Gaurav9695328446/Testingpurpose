import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core/config/auth.guard';
import { AnniversaryComponent } from './anniversaries/anninversary.component';
import { TrendingLeadersComponent } from './trending-leaders/trending-leaders.component';
import { ForgetPasswordComponent } from './common/forget-password/forget-password.component';
import { NewsComponent } from './news/news.component';



const mainRoute: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile', loadChildren: '../app/profile/profile.module#ProfileModule', canActivate: [AuthGuard] },
  { path: 'profile/:id', loadChildren: '../app/profile/profile.module#ProfileModule' },
  { path: 'editprofile', loadChildren: '../app/editprofile/editprofile.module#EditProfileModule', canActivate: [AuthGuard] },
  { path: 'anninversary', loadChildren: '../app/anniversaries/anninversary.module#AnniversaryModule' },
  { path: 'hamare-netaji-kahen', loadChildren: '../app/hamare-netaji-kahen/hamare-netaji-kahen.module#HamareNetajiKahenModule' },
  { path: 'upcoming-elections', loadChildren: '../app/upcoming-elections/upcoming-elelections.module#UpcomingElelectionsModule' },
  { path: 'directory', loadChildren: '../app/directory/directory.module#DirectoryModule' },
  { path: 'achivies', loadChildren: '../app/achivies/achivies.module#AchiviesModule' },
  { path: 'interviews', loadChildren: '../app/interviews/interviews.module#InterviewsModule' },
  { path: 'my-leader-profile', loadChildren: '../app/my-leader-profile/my-leader-profile.module#MyLeaderProfileModule' },
  { path: 'my-profile', loadChildren: '../app/my-profile/my-profile.module#MyProfileModule' },
  { path: 'forgot-password', component: ForgetPasswordComponent },
  { path: 'news', loadChildren: '../app/news/news.module#NewsModule' },
  // { path: 'leaders', component: 'TrendingLeadersComponent' }


];


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: MainComponent, children: mainRoute },
];
