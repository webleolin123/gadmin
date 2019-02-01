import {NgModule} from '@angular/core';
import {SharedModule} from '@shared';
import {SystemsRoutingModule} from './systems-routing.module';
import {
    MechanismManageComponent,
    MechanismManageCheckComponent,
    MechanismManageAddComponent,
    MechanismManageOwnComponent,
    MechanismManageService,
    PersonnelManageComponent,
    PersonnelManageAddComponent,
    PersonnelManageOwnComponent,
    PersonnelManageCheckComponent,
    PersonnelManageModifyComponent,
    PersonnelManageService,
    RolesManageComponent,
    RolesManageAddComponent,
    RolesManageService,
    BrowserSupportComponent,
    DictManageComponent,
    DictManageAddComponent,
    DictManageCheckComponent,
    DictManageService,
    UserSettingsComponent,
    UserSettingsBaseComponent,
    UserSettingsSecurityComponent,
    UserSettingsBindingComponent,
    UserSettingsNotificationComponent,
    UserSecurityEditComponent,
    SettingsService,
} from './';

const COMPONENTS = [
    MechanismManageComponent,
    PersonnelManageComponent,
    RolesManageComponent,
    DictManageComponent,
    BrowserSupportComponent,
    UserSettingsComponent,
    UserSettingsBaseComponent,
    UserSettingsSecurityComponent,
    UserSettingsBindingComponent,
    UserSettingsNotificationComponent,
];
const COMPONENTS_NOROUNT = [
    MechanismManageAddComponent,
    MechanismManageCheckComponent,
    MechanismManageOwnComponent,
    PersonnelManageAddComponent,
    PersonnelManageCheckComponent,
    PersonnelManageOwnComponent,
    PersonnelManageModifyComponent,
    DictManageCheckComponent,
    DictManageAddComponent,
    RolesManageAddComponent,
    UserSecurityEditComponent,
];

@NgModule({
    imports: [SharedModule, SystemsRoutingModule],
    declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
    entryComponents: [...COMPONENTS_NOROUNT],
    providers:[MechanismManageService,PersonnelManageService,RolesManageService,DictManageService,SettingsService],
})
export class SystemsModule {
}
