import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
//实现功能 1.控制日志输出 2.退出登录并关闭日志输出
export class LogService {
    debug = true;
    login_url: string = '/passport/login';

    constructor(
        private router: Router,
    ) {
    }

    printLog(type, msg) {
        if (this.debug) {
            console.log(type, msg);
        }
    }

    logOut() {
        window.localStorage.clear();//清理本地缓存
        this.router.navigateByUrl(this.login_url);
    }
}
