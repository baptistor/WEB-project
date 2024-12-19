import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { DetailItemComponent } from './detail-item/detail-item.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'monsters', component: ListComponent},
    {path: 'creatures', component: ListComponent},
    {path: 'entry/:id', component: DetailItemComponent }, 
    {path: 'search', component: SearchComponent},
    {path: '', redirectTo:'home', pathMatch:"full"},
    {path: '**', component: HomeComponent}

];
