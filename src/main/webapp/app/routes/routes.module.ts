import {NgModule} from '@angular/core';
import {SharedModule} from '@shared';
import {RouteRoutingModule} from './routes-routing.module';
// dashboard pages
import {DashboardComponent} from './dashboard/dashboard.component';
// widgets pages
import {WidgetsComponent} from './widgets/widgets.component';
// passport pages
import {UserLoginComponent} from './passport/login/login.component';
import {UserRegisterComponent} from './passport/register/register.component';
import {UserRegisterResultComponent} from './passport/register-result/register-result.component';
import {UserResetComponent} from './passport/reset/reset.component';
import {PrivacyComponent} from './privacy-clause/privacy/privacy.component';
import {ClauseComponent} from './privacy-clause/clause/clause.component';
// single pages
import {UserLockComponent} from './passport/lock/lock.component';
import {CallbackComponent} from './callback/callback.component';
import {CoreModule} from "@core";
import {ExceptionModule} from "./exception/exception.module";
// import {DataVModule} from "./data-v/data-v.module";
import {ProModule} from "./pro/pro.module";
import {ExtrasModule} from "./extras/extras.module";
import {DelonModule} from "./delon/delon.module";
import {StyleModule} from "./style/style.module";
//map pages
import {MapsModule} from './map/maps.module';
//systems module
import {SystemsModule} from "./systems/systems.module";
import {CommondModule} from "../common/common.module";

const COMPONENTS = [
    WidgetsComponent,
    DashboardComponent,
    // passport pages
    UserLoginComponent,
    UserRegisterComponent,
    UserRegisterResultComponent,
    UserResetComponent,
    PrivacyComponent,
    ClauseComponent,
    // single pages
    UserLockComponent,
    CallbackComponent,
];
const COMPONENTS_NOROUNT = [];

@NgModule({
    imports: [
        StyleModule,
        DelonModule,
        ExtrasModule,
        ProModule,
        ExceptionModule,
        SharedModule,
        RouteRoutingModule,
        CoreModule,
        CommondModule,
//map pages
        MapsModule,
//systems module
        SystemsModule,
    ],
    declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
    entryComponents: COMPONENTS_NOROUNT
})
export class RoutesModule {
}
