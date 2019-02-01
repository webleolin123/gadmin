import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {SharedModule} from '../shared';
import {
// chart图表封装
    LogService,//引入自定义log服务
//导出数据封装
    CustomPipe,
    OperationPipe,
    ContainPipe,
    HtmlPipe,
} from './';

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: [
        CustomPipe,
        OperationPipe,
        ContainPipe,
        HtmlPipe,
    ],
    providers: [
        LogService,
    ],
    entryComponents: [],
    exports: [
        SharedModule,
        CustomPipe,
        OperationPipe,
        ContainPipe,
        HtmlPipe,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CommondModule {
}
