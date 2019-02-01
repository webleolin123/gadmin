import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzModalRef} from 'ng-zorro-antd';
import {NzModalService} from 'ng-zorro-antd';
import {HttpResponse} from '@angular/common/http';
import {PersonnelManageService} from '../personnel-manage.service';
import {LogService} from '../../../../../common/log/log.service';
import {PersonnelManageModel} from '../personnel-manage.model';
import {RolesManageModel} from '../../rolesManage/roles-manage.model';
import {RolesManageService} from '../../rolesManage/roles-manage.service';
@Component({
    selector: 'jhi-personnel-manage-add-dialog',
    templateUrl: './add.component.html',
})
export class PersonnelManageAddComponent implements OnInit {
    parentData: any;//parentData.login是否拥有用户名 没有--创建   如果有--编辑
    data: PersonnelManageModel;//返回数据
    listOfOption = [];
    listOfTagOptions = [];

    constructor(
        private modal: NzModalRef,
        public msg: NzMessageService,
        public modalService: NzModalService,
        private personnelManageService: PersonnelManageService,
        private rolesManageService: RolesManageService,
        private logService: LogService,
    ) {
    }

    ngOnInit() {
        if (this.parentData.login) {
            this.personnelManageService.findUserByLogin(this.parentData.login).subscribe(
                (res: HttpResponse<PersonnelManageModel>) => this.onGetUserSuccess(res.body),
                (res: HttpResponse<any>) => this.onSaveError(res)
            )
        }
        else {
            this.data = new PersonnelManageModel;
            this.data.activated = true;//默认 激活
        }
        setTimeout(()=>{ this.loadAllAuthorities();},500);
    }

    loadAllAuthorities() {
        this.rolesManageService.query({
            size: 10000,
        }).subscribe(
            (res: HttpResponse<(RolesManageModel)[]>) => this.onLoadAllAuthsSuccess(res.body),
            (res: Response) => this.onSaveError(res)
        )
    }

    onLoadAllAuthsSuccess(data) {
        this.logService.printLog('获取所有角色列表', data);
        if (data) {
            this.listOfOption = data.content;
            this.listOfTagOptions = this.data.authorities;//显示已有角色
            console.log('this.listOfTagOptions', this.listOfTagOptions);
        }
    }

    save() {//备注 用户填写_manage 大小写 都不允许 后端会报406
        console.log('this.listOfTagOptions', this.listOfTagOptions);
        this.data.authorities = this.listOfTagOptions;
        if (this.parentData.login) {
            this.personnelManageService.update(this.data).subscribe(
                (res: HttpResponse<PersonnelManageModel>) => this.onSaveSuccess(res),
                (res: HttpResponse<any>) => this.onSaveError(res));
        } else {
            this.personnelManageService.create(this.data).subscribe(
                (res: HttpResponse<PersonnelManageModel>) => this.onSaveSuccess(res),
                (res: HttpResponse<any>) => this.onSaveError(res));
        }
    }
    valiLogin(login){
        console.log('login',login);
        const reg=/^[0-9a-zA-Z]+$/;
        if(!reg.test(login)){
            this.msg.error( '用户名只能输入数字和字母');
            this.data.login='';
        }
    }
    valiEmail(email){
        console.log('login',email);
        const reg=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        const str='@localhost';
        if(email){
            if(!reg.test(email)&&!email.endsWith(str)){//匹配邮箱格式 以及特例 以@localhost结尾的字符串 可以通过
                this.msg.error( '邮箱格式不正确，请重新输入');
                this.data.email='';
            }
        }
    }
    valiPhone(phone){
        const reg=/^1(3|4|5|7|8)\d{9}$/;
        if(!reg.test(phone)){//手机号格式
            this.msg.error( '手机号格式不正确，请重新输入');
            this.data.mobilePhone='';
        }
}
    onGetUserSuccess(data) {
        this.logService.printLog('获取个人员信息响应', data);
        if (data) {
            this.data = data;
        }
    }
    private onSaveSuccess(res) {
        this.logService.printLog('res', res);
        if (res.ok === true) {
            this.msg.success(!this.parentData.login ? '创建成功' : '修改成功');
            this.close();
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

