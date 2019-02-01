import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {SettingsService} from '@delon/theme';
import {LoginService} from "@core";

@Component({
    selector: 'layout-sidebar',
    templateUrl: './sidebar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
    constructor(
        public settings: SettingsService,
        private changeRef:ChangeDetectorRef
    ) {
    }
    ngOnInit() {
        setInterval(() => {//使用定时时间检测变化
            this.changeRef.markForCheck();
        });
    }
}
