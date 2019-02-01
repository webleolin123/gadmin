import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzModalRef} from 'ng-zorro-antd';
import {NzModalService} from 'ng-zorro-antd';
import {HttpResponse} from '@angular/common/http';
import {PersonnelManageService} from '../personnel-manage.service';
import {LogService} from '../../../../../common/log/log.service';
import {MechanismManageModel} from '../../mechanismManage/mechanism-manage.model';
import {MechanismManageService} from '../../mechanismManage/mechanism-manage.service';
import {UserCompanyModel} from '../../user-company.model';
@Component({
    selector: 'jhi-personnel-manage-own-dialog',
    templateUrl: './own.component.html',
})
export class PersonnelManageOwnComponent implements OnInit {
    parentData: any;//parentData.login是否拥有用户名 没有--创建   如果有--编辑
    data: UserCompanyModel;//返回数据
    listOfOption = [];
    listOfTagOptions:any;
    companyId: any;//保存人员关联的机构id
    hasCompanyList: any=[];//保存人员关联的机构id列表
    companies:any=[];
    chooseCompany:any;//ngModel Value
    companyIdList:any=[];
    isChecked=false;//是否选择 默认false
    isDelete=false;//是否删除 默认false
    company:any={};//选择的已关联机构
    constructor(
        private modal: NzModalRef,
        public msg: NzMessageService,
        public modalService: NzModalService,
        private personnelManageService: PersonnelManageService,
        private mechanismManageService: MechanismManageService,
        private logService: LogService,
    ) {}
    ngOnInit() {
        this.isOwnCompany();
    }
    change($event){
        this.companies=$event;
    }
    choose(company){
        this.isChecked=true;
        this.company=company;
    }
    removeCompany() {
        const modal = this.modalService.confirm({
            nzTitle: '你确定要删除?',
            nzContent: `机构名称:<b style="color:red;">${this.company.companyName}</b>`,
            nzOkText: '确定',
            nzOkType: 'danger',
            nzOnOk: () => {
                this.isDelete=true;//确认删除 标志更新为true
                this.personnelManageService.deleteUser({
                    companyId:Number(this.company.companyId),
                    login: this.parentData.login,
                }).subscribe(
                    (res: HttpResponse<UserCompanyModel>) => this.onSaveSuccess(res),
                    (res: HttpResponse<any>) => this.onSaveError(res)
                );
            },
            nzCancelText: '取消',
            nzOnCancel: () => {
                this.isDelete=false;//取消确认，删除标志变为false
                modal.destroy()
            },
        });
    }
    isOwnCompany() {
        this.personnelManageService.findByLogin(this.parentData.login).subscribe(
            (res: HttpResponse<UserCompanyModel>) => {
                this.onFindCompanyIdSuccess(res.body)
            },
            (res: Response) => this.onSaveError(res)
        )
    }

    onFindCompanyIdSuccess(data) {
        this.logService.printLog('获取所有已关联公司', data);
        if (data) {//有数据，关联过 获取关联的机构列表
            this.companyIdList=[];
            this.hasCompanyList=[];
            data.forEach((item) => {
                this.companyIdList.push(item.companyId);
                this.hasCompanyList.push({companyId:item.companyId,companyName:item.companyName});
            });
            this.data = new UserCompanyModel;
            this.data.byLogin = this.parentData.login;
            this.data.nickName = this.parentData.nickName;
        }
        this.loadAllCompanies();
    }

    loadAllCompanies() {
        this.mechanismManageService.query({
            size: 10000,
        }).subscribe(
            (res: HttpResponse<(MechanismManageModel)[]>) => this.onLoadAllCompaniesSuccess(res.body),
            (res: Response) => this.onSaveError(res)
        )
    }

    onLoadAllCompaniesSuccess(data) {
        this.logService.printLog('res_所有公司信息', data);
        if (data) {
            data.content.forEach((item) => {
                this.listOfOption.push({companyId: item.id, companyName: item.name});//转换为需要的数据格式
            });
        }
    }
    save() {//备注 用户填写_manage 大小写 都不允许 后端会报406
        const repeatList=[];
        const index=this.companyIdList.indexOf(this.companies);
        if(index!=-1){//与已关联的机构数组比较 如果找到相同的
            this.hasCompanyList.forEach((item)=>{
                if(this.companyIdList[index]==item.companyId){
                    repeatList.push(item.companyName);
                }
            })
        }
        if(repeatList.length>0){//如果存在重复添加的情况
            this.msg.info( repeatList.join(',')+'已关联，请去除后再关联');
        }
        else{//正常添加
            if(!this.companies){//如果为空
                this.msg.info( '您未选中关联机构');
            }
            else{
                this.data.companyId = this.companies;
                this.personnelManageService.createOwn(this.data).subscribe(
                    (res: HttpResponse<UserCompanyModel>) => this.onSaveSuccess(res),
                    (res: HttpResponse<any>) => this.onSaveError(res));
            }
            }
    }

    private onSaveSuccess(res) {
        this.logService.printLog('res', res);
        if (res.ok === true) {
            if(this.isDelete){//移除操作 不清空选框
                this.hasCompanyList.splice(this.company.index,1);//删除成功 移除已关联机构列表中的对应的元素
                this.msg.success( '移除成功');
    // 成功都要执行
                this.isDelete=false;
                this.isChecked=false;//隐藏移除按钮
                this.isOwnCompany();//重新调用已关联人员接口
            }
            else{//关联操作 清空选框
                this.listOfTagOptions=[];//清空选择关联机构
                this.companies=[];//清空选择关联机构
                this.msg.success( '关联成功');
                this.close();
            }
        }
    }

    private onSaveError(res) {
        this.logService.printLog('err', res);
        this.modalService.error({
            nzTitle: '哎呀,出错了!',
            nzContent: `${res.error.status}:${res.error.message}<br>${res.error.title}`,
        });
    }

    close() {
        this.modal.destroy();
    }
}

