import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LbsAmapComponent} from './lbs-amap/lbs-amap.component';

const routes: Routes = [
    {
        path: 'lbsamap',
        component: LbsAmapComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MapsRoutingModule {
}
