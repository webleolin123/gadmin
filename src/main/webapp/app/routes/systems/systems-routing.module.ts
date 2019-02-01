import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RolesManageComponent} from './authority/rolesManage/roles-manage.component';
import {PersonnelManageComponent} from './authority/personnelManage/personnel-manage.component';
import {MechanismManageComponent} from './authority/mechanismManage/mechanism-manage.component';

import {DictManageComponent} from './settings/dict/dict-manage.component';
import {BrowserSupportComponent} from './settings/browser-support/browser-support.component';
import {UserSettingsComponent} from "./user/settings/settings.component";
import {UserSettingsBaseComponent} from "./user/settings/base/base.component";
import {UserSettingsSecurityComponent} from "./user/settings/security/security.component";
import {UserSettingsBindingComponent} from "./user/settings/binding/binding.component";
import {UserSettingsNotificationComponent} from "./user/settings/notification/notification.component";


const routes: Routes = [
    {
        path: 'authority',
        children: [
            {path: 'roles', component: RolesManageComponent},
            {path: 'personnel', component: PersonnelManageComponent},
            {path: 'mechanism', component: MechanismManageComponent},
        ],
    },
    {
        path: 'settings',
        children: [
            {path: 'dict', component: DictManageComponent},
            {path: 'browserSupport', component: BrowserSupportComponent},
        ],
    },
    {
        path: 'user',
        children: [
            {
                path: 'settings',
                component: UserSettingsComponent,
                children: [
                    {   path: '', redirectTo: 'base', pathMatch: 'full'},
                    {
                        path: 'base',
                        component: UserSettingsBaseComponent,
                        data: {titleI18n: 'user-settings'},
                    },
                    {
                        path: 'security',
                        component: UserSettingsSecurityComponent,
                        data: {titleI18n: 'user-settings'},
                    },
                    {
                        path: 'binding',
                        component: UserSettingsBindingComponent,
                        data: {titleI18n: 'user-settings'},
                    },
                    {
                        path: 'notification',
                        component: UserSettingsNotificationComponent,
                        data: {titleI18n: 'user-settings'},
                    },
                ],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SystemsRoutingModule {
}
