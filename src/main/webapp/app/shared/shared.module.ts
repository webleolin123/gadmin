import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
// delon
import {AlainThemeModule} from '@delon/theme';
import {DelonABCModule} from '@delon/abc';
import {DelonChartModule} from '@delon/chart';
import {DelonACLModule} from '@delon/acl';
import {DelonFormModule} from '@delon/form';

// #region third libs
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {CountdownModule} from 'ngx-countdown';
import {UEditorModule} from 'ngx-ueditor';
import {NgxTinymceModule} from 'ngx-tinymce';

const THIRDMODULES = [
    NgZorroAntdModule,
    CountdownModule,
    UEditorModule,
    NgxTinymceModule,
];
// #endregion

// #region your componets & directives
const COMPONENTS = [];
const DIRECTIVES = [];
// #endregion

import {NgbDateAdapter} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateMomentAdapter} from './util/datepicker-adapter';
import {GadminSharedLibsModule, HasAnyAuthorityDirective} from './';

@NgModule({
    imports: [
        GadminSharedLibsModule,
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        AlainThemeModule.forChild(),
        DelonABCModule,
        DelonChartModule,
        DelonACLModule,
        DelonFormModule,
        // third libs
        ...THIRDMODULES
    ],
    declarations: [
        // your components
        ...COMPONENTS,
        ...DIRECTIVES,
        HasAnyAuthorityDirective
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AlainThemeModule,
        DelonABCModule,
        DelonChartModule,
        DelonACLModule,
        DelonFormModule,
        // third libs
        ...THIRDMODULES,
        HasAnyAuthorityDirective,
        // your components
        ...COMPONENTS,
        ...DIRECTIVES
    ]
})
export class SharedModule {
    static forRoot() {
        return {
            ngModule: SharedModule
        };
    }
}
