import {Component, OnDestroy, OnInit} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd';
import {NzMessageService} from 'ng-zorro-antd';
import {ModalHelper} from '@delon/theme';
import {HttpResponse} from '@angular/common/http';
import {MechanismManageService} from './mechanism-manage.service';
import {LogService} from '../../../../common/log/log.service';
import {MechanismManageModel} from './mechanism-manage.model';
import {MechanismManageAddComponent} from './add/add.component';
import {MechanismManageCheckComponent} from './check/check.component';
import {MechanismManageOwnComponent} from './own/own.component';
import {Principal} from '@core/auth/principal.service';
import {
    ITEMS_PER_PAGE,
} from '@shared/constants/pagination.constants';
@Component({
    selector: 'mechanism-manage',
    templateUrl: './mechanism-manage.component.html',
})
export class MechanismManageComponent implements OnInit, OnDestroy {
    hasAuthWithAdmin:boolean;//是否有超管权限
    pageIndex = 1;//默认第一页
    pageSize = ITEMS_PER_PAGE;//显示10条数据
    total = 1;//总记录数 定义默认值1 类型number
    dataSet = [];//接收返回数据
    loading = true;//控制是否loading
    sortArr: any=null;//排序条件数组 字段+正/倒叙
    constructor(
        private mechanismManageService: MechanismManageService,
        private logService: LogService,
        private modalService: NzModalService,
        public msg: NzMessageService,
        private modal: ModalHelper,
        private principal: Principal,
    ) {
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.logService.printLog('account', account);
            if (account) {
                this.searchData();
            }
        });
    }

    ngOnDestroy() {
    }

    searchData(reset: boolean = false): void {
        if (reset) {
            this.pageIndex = 1;
        }
        this.loading = true;
        this.mechanismManageService.query({
            page: this.pageIndex - 1,
            size: this.pageSize,
            sort: this.sortArr,
        }).subscribe(
            (res: HttpResponse<(MechanismManageModel)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onSaveError(res)
        );
    }

    add() {
        this.modal
            .static(MechanismManageAddComponent, {parentData: {id: null}})
            .subscribe(() => {//回调函数 重新请求新数据
                this.searchData();
            });
    }

    edit(id) {
        this.modal
            .static(MechanismManageAddComponent, {parentData: {id: id}})
            .subscribe(() => {//回调函数 重新请求新数据
                this.searchData();
            });
    }

    delete(id) {
        const modal = this.modalService.confirm({
            nzTitle: '你确定要删除?',
            nzContent: `ID:<b style="color:red;">${id}</b>`,
            nzOkText: '确定',
            nzOkType: 'danger',
            nzOnOk: () => {
                this.mechanismManageService.delete(id).subscribe(
                    (res: HttpResponse<MechanismManageModel>) => this.onSaveSuccess(res),
                    (res: HttpResponse<any>) => this.onSaveError(res)
                );
            },
            nzCancelText: '取消',
            nzOnCancel: () => {
                modal.destroy()
            },
        });
    }

    check(id) {
        this.modal
            .static(MechanismManageCheckComponent, {parentData: {id: id}})
            .subscribe(() => {//回调函数 重新请求新数据
                this.searchData();
            });
    }

    own(id,companyName) {
        this.modal
            .static(MechanismManageOwnComponent, {parentData: {id: id,companyName:companyName}})
            .subscribe(() => {//回调函数 重新请求新数据
                this.searchData();
            });
    }

    sort(sort: { key: string, value: string }){
        if(sort.value){
            this.sortArr = [sort.key + ',' + (sort.value.replace('end',''))];
        }
        else{
            this.sortArr = null;
        }
        this.searchData();
    }

    private onSuccess(data) {//列表请求使用
        this.logService.printLog('data', data);
        if (data) {
            this.loading = false;
            this.dataSet = data.content;
            this.total = data.totalElements;
        }
    }

    private onSaveSuccess(res) {//弹窗请求使用
        this.logService.printLog('res', res);
        if (res.ok === true) {
            this.msg.success('删除成功');
            this.searchData();
        }
    }

    private onSaveError(res) {
        this.logService.printLog('err', res);
        this.modalService.error({
            nzTitle: '哎呀,出错啦!',
            nzContent: `${res.error.status}:${res.error.message}<br>${res.error.title}`,
        });
    }
}
