import {NgModule} from '@angular/core';
import {SharedModule} from '@shared';
import {MapsRoutingModule} from './maps-routing.module';
import {LbsAmapComponent} from './lbs-amap/lbs-amap.component';

const COMPONENTS = [
    LbsAmapComponent,
];
const COMPONENTS_NOROUNT = [];

@NgModule({
    imports: [
        SharedModule,
        MapsRoutingModule,
    ],
    exports: [ LbsAmapComponent],
    declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
    entryComponents: [LbsAmapComponent],
})
export class MapsModule {
}
